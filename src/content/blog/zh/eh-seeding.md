---
title: '记 E 站做种'
description: '介绍了 E-Hentai 的 3 种货币以及做种方法'
pubDate: 'Apr 16 2024'
heroImage: 'https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/814af32f-d3ff-467a-3a53-036105e93e00/small'
lang: 'zh'
pinned: true
---

## 什么是 E 站

E 站，全称 E-Hentai，世界上最成功的去中心化项目之一。无论是带宽、存储、流量、用户数量、社区活跃程度，都吊打 Filecoin、IPFS 等一众野鸡 web3 项目。

咳咳，开个玩笑，大家都知道 E 站是什么，就不多说了。

E 站有表里之分，表站有广告，内容有更加严苛的审核，而里站则没有广告，内容更加丰富。

表站域名：[e-hentai.org](https://e-hentai.org/)

里站域名：[exhentai.org](https://exhentai.org/)

推荐使用 [EHViewer](https://github.com/FooIbar/EhViewer) 客户端访问 E 站，可以避免广告，提供更好的体验。

### 关于里站

你需要在论坛注册账号，在一段时间后通过审核，才能访问里站。里站对 IP 地址有限制，如果打不开，建议切换到欧美的 IP。EHViewer 保证你只要成功打开一次，之后就算切换 IP 也能正常访问。

里站似乎不需要梯子，不过我没有用过中国大陆的 IP，所以不太清楚。

里站认证的原理是：

1. 从论坛登录，获得 cookie，这个 cookie 在表站和里站中共享
2. cookie 有`igneous`, `ipb_member_id`, `ipb_pass_hash`, `sk`四个字段，表站会获得后 3 个字段。
3. 在访问里站时，获得`igneous`字段，集齐 4 个有效字段，就可以访问里站了。如果`igneous`字段为`mystery`，则可能需要检查网络环境。

如果是新注册的号，建议全程保持一致的欧美 IP，并且不要着急上里站，过几天就能上了。

如果没有正确的方式进入，会出现一只哭泣的熊猫。

## E 站货币

简单来说，E 站有三种货币：

- [Gallery Points](https://ehwiki.org/wiki/Gallery_Points) (GP)：下载图片时消耗的货币
- [Credit Points](https://ehwiki.org/wiki/Credits) (CP)：流通积分，可以转账，用 GP 或者 Hath 购买
- [Hath](https://ehwiki.org/wiki/Hath)：高价值，也是功能最强的货币

### Gallery Points

具体来说 GP 主要是平常下载的时候用，一般也就只需要用到 GP 而不需要用到另外两种（除非你用量真的很大）。

GP 的用途：

1. **当 Credit 不足时**，下载**高分辨率**图集消耗 GP（越高的分辨率消耗的 GP 越多）
2. 刷新浏览配额（默认上限 5000，每分钟回复 3，可通过 GP 刷新）
3. 购买 Credit 和 Hath

GP 的获得方式：

1. H@H 做种
2. 通过 CP 或者 Hath 购买
3. 上传图集（在被点击时获取 GP）
4. bittorrent 做种
5. 捐助

一般来说 H@H 做种就能获得足够多的 GP 了，所以不需要特别去购买 GP。

### Credit Points

Credit 是提供流通的货币，主要用于提供流通性，可以与其他两种货币互换。

CP 的用途：

1. 下载高分辨率图集（越高的分辨率消耗的 CP 越多）
2. 与其他货币互换
3. 转账给他人

CP 的获得方式：

1. 由 GP 转换而来
2. 捐赠
3. 上传图集（在其他用户消耗 CP/GB 下载高分辨率图集时获取 CP）
4. 完成赏金任务
5. 接收其他用户的转账

### Hath

价值最高，也是功能最强大的货币，主要用来解锁高级功能。

Hath 的获得方式：

1. 由其他货币转换而来
2. H@H 做种
3. Siliver 以上的捐助等级每日发放
4. 论坛活动

Hath 的用途：

1. **购买高级功能**（例如屏蔽广告、一页显示多张图片、增加缩略图显示数量等）
2. 购买成 Credit

## H@H 做种

关于什么是 H@H，请参考 [官方 wiki](https://ehwiki.org/wiki/Hentai@Home)

参与 H@H 做种，可以每天获得一定量的 Hath, GP, Moderation Power. 而且，可以每周获得一定量的免费下载流量。免费下载流量可以省下一些 GP 或者 CP。

在 [H@H 主页](https://e-hentai.org/hentaiathome.php)，你可以看到全球的 H@H 服务状态。

### 提交申请

H@H 需要申请才能参加，你需要注册账号，然后在 [H@H 主页](https://e-hentai.org/hentaiathome.php) 下方的申请表中填写你的信息。

假设你使用 Debian 系统，其他 Linux 系统也类似，你需要 [speedtest-cli](https://www.speedtest.net/apps/cli) 来测速，证明你的实力。

注意，H@H 的申请有要求

- 你必须有至少 80Mbps 的上下行带宽
- 你必须要有至少 10GiB 的空闲硬盘空间
- 服务器必须一直在线

我这里上报了 950Mbps 的上下行带宽，并且附带了 speedtest-cli 的测速结果，硬盘空间给了 1T，等了几个小时就通过了。

之后，重新访问 [H@H 主页](https://e-hentai.org/hentaiathome.php)，在 Your Active Clients 下点击你的 new client，录入客户端设置。

### 客户端设置

因为我是 deian，所以就讲 debian 怎么做。~windows server 不配做种~

首先安装 jre 或者 jdk，这东西是可恶的 java 程序。因为这个机器是开发机，所以我装了 jdk。

在 [Oracle](https://www.oracle.com/java/technologies/downloads/) 找到 JDK 的下载链接，这里我下载的是 JDK 22 deb 包。

```bash
wget -c https://download.oracle.com/java/22/latest/jdk-22_linux-x64_bin.deb
sudo apt install ./jdk-22_linux-x64_bin.deb
```

然后，在 [H@H 主页](https://e-hentai.org/hentaiathome.php) 下载 H@H 客户端。

> 链接可能过时，请手动更换最新链接

```bash
wget -c https://repo.e-hentai.org/hath/HentaiAtHome_1.6.2.zip
unzip HentaiAtHome_1.6.2.zip
```

你需要手动运行第一次，输入必要的数据，然后放 systemctl 里面。

```bash
cd HentaiAtHome_1.6.2
java -jar HentaiAtHome.jar
```

在`hentai_at_home.service`中这么配置

```ini
[Unit]
Description=Hentai@Home
After=network.target

[Service]
Type=simple
User=your_user  # 务必确保有权限写入缓存
Group=your_group
Restart=always
WorkingDirectory=/path/to/HentaiAtHome_1.6.2
ExecStart=/usr/bin/java -jar /path/to/HentaiAtHome_1.6.2/HentaiAtHome.jar

[Install]
WantedBy=multi-user.target
```

然后就可以设置守护进程和开机自启了

```bash
sudo systemctl enable hentai_at_home
sudo systemctl start hentai_at_home
```