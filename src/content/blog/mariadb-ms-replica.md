---
title: '记一次 MariaDB 的主从备份配置'
description: 'MariaDB 主从备份配置的一些注意事项。'
pubDate: 'Apr 2 2024'
heroImage: 'https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/51881f55-2f8d-47ec-da3d-5b97542ff400/small'
---

## 什么是主从备份，为什么要主从备份

主从备份是指在数据库中，有一个主数据库，负责写入数据，而有一个或多个从数据库，负责读取数据。主数据库写入数据后，会自动同步到从数据库，从数据库可以读取主数据库的数据，但不能写入数据。

对于小规模的服务，可能没有必要使用多个从库来提高读取性能。但是，主从备份的一个重要作用是，当主数据库出现问题时，可以快速切换到从数据库，保证服务的可用性。就算是小规模服务，也不能动不动就挂一天。

主从复制基于二进制日志，主库会把写入的数据记录到二进制日志中，从库会读取这个日志，然后在自己的数据库中执行相同的操作。这样，从库的数据就和主库的数据保持一致。

因为之前没有二进制日志，所以第一次的时候需要把主库的数据导入到从库，然后再开始同步。

## 基本流程

1. 在主数据库上创建一个用于同步的用户
2. 修改配置文件，设置主从关系
3. 锁住主库，把现在的数据导出，导入到从库
4. 导入完成后，解锁主库，从库开始同步后续的数据

因为是从库的服务器向主库请求数据，所以必须放通从库到主库的连接。可能需要放通的连接有：

- 云服务商的安全组
- ufw等防火墙
- 宝塔面板的防火墙
- mariadb的防火墙

如果能只放行某个IP的连接，那就只放通从库的IP。

## 具体步骤

### 创建同步用户

```bash
mysql -u root -p
# 可能需要输入密码，如果没有密码，直接回车
```

进入SQL命令行后，输入以下命令

```sql
GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

其中，`replica`是用户名，`password`是密码。你应该用随机密码来替换`password`。

`'replica'@'%'`代表一个名为`replica`的用户，可以从任何IP连接到数据库。如果你知道从库的IP，也可以用`'replica'@'ip'`来限制连接。

如果你需要调试之类的情况，要用`username@ip`的形式连接数据库，只需要保留`replica`的部分，不用管后面的`%`。

### 修改配置文件

通常来说，配置文件在`/etc/mysql/mariadb.conf.d/50-server.cnf`。

在`[mysqld]`部分，找到被注释的`server-id`和`log_bin`，取消注释，并设置`server-id`为一个唯一的数字，`log_bin`为一个文件名（直接不改也行）。

```ini
[mysqld]
server-id = 1
log_bin = /var/log/mysql/mariadb-bin
```

重启服务

```bash
sudo systemctl restart mariadb
```

如果重启失败，很可能是找不到`log_bin`文件所在的文件夹，或者没有权限写入。

```bash
# 创建文件夹
mkdir -p /var/log/mysql

# 修改权限
chown -R mysql:mysql /var/log/mysql
```

### 导入数据

在主库，用`mysqldump`命令导出数据

```bash
cd ~
mysqldump -u root -p --all-databases --master-data > dump.sql
```

这个命令会把所有数据库的数据导出到`dump.sql`文件中。`--master-data`选项会在文件中添加`CHANGE MASTER TO`语句，用于从库同步。

把这个文件上传到从库，然后导入

```bash
mysql -u root -p < dump.sql
```

### 配置从库

同样，在`/etc/mysql/mariadb.conf.d/50-server.cnf`中，找到`[mysqld]`部分，取消注释`server-id`。**注意必须是和主库不同的数字**。

```ini
[mysqld]
server-id = 2
```

### 开始同步

首先，给主库加锁

```sql
FLUSH TABLES WITH READ LOCK;
```

然后查看主库状态

```sql
SHOW MASTER STATUS;
```

你需要记录下来`File`和`Position`，用于配置从库。

在从库中，输入以下命令

```sql
CHANGE MASTER TO
    MASTER_HOST='主库IP',
    MASTER_USER='replica',
    MASTER_PASSWORD='password',
    MASTER_LOG_FILE='File',
    MASTER_LOG_POS=Position;
```

你需要把`主库IP`、`password`、`File`、`Position`替换成实际的值。

然后，启动同步

```sql
START SLAVE;
```

你可以查看从库的状态

```sql
SHOW SLAVE STATUS\G
```

如果`Slave_IO_Running`和`Slave_SQL_Running`都是`Yes`，那么就是成功了。

在完成同步后，解锁主库

```sql
UNLOCK TABLES;
```