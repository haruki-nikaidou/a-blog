---
title: 'ESXi 中的 Debian 虚拟机安装 NVIDIA 显卡驱动'
description: '尝试在 ESXi 虚拟出的 Debian 系统中，安装 NVIDIA 显卡驱动。遇到了几个问题，并且最终找到了解决方案。'
pubDate: 'Nov 28 2023'
pinned: true
heroImage: 'https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/1ccd914c-455c-4eee-8bde-b28aae802100/small'
---

近期，尝试在家庭数据中心搭建一个用来跑 AI 的服务器。因为我只有一台设备可以带的动 3090，买一个新的又太贵了，所以选择用 ESXi 直通虚拟机。

虚拟机配置如下：

+ EPYC  7302 * 48
+ 基于 ESXi-7.0U3 平台
+ NVIDIA GeForce RTX 3090
+ 128G 内存
+ Debian GNU/Linux 12 (bookworm) x86_64

## 主要过程

首先配置虚拟机，按照惯例，设置：

+ 锁定全部内存
+ 设置`hypervisor.cpuid.v0=FALSE`
+ 设置`pciPassthru0.msiEnabled=FALSE`

不做过多赘述，以后可能会补充具体过程。（咕咕咕）反正可以在很多地方找到这几个操作。

在虚拟机内，首先配置 apt 源，使之包含`non-free-firmware`。 在`/etc/apt/source.list`中，添加`non-free-firmware`，完成后应该形如：

```
deb https://deb.debian.org/debian/ bookworm main contrib non-free non-free-firmware
```

然后，

```bash
sudo apt update
apt search ^nvidia-driver
```

如果正常，应该能找到

```
nvidia-driver/unknown 545.23.06-1 amd64
  NVIDIA metapackage
```

## 问题

通常在物理机上，可以直接`sudo apt install nvidia-driver`，但在虚拟机，这样不行。

先说如果按照物理机上的方案，直接`apt install`会发生什么。

首先习惯性地先装 cuda

```bash
sudo apt-get install software-properties-common
wget https://developer.download.nvidia.com/compute/cuda/12.3.0/local_installers/cuda-repo-debian12-12-3-local_12.3.0-545.23.06-1_amd64.deb
sudo dpkg -i cuda-repo-debian12-12-3-local_12.3.0-545.23.06-1_amd64.deb
sudo cp /var/cuda-repo-debian12-12-3-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo add-apt-repository contrib
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-3
```

然后

```bash
sudo apt install nvidia-driver
```

重启，查询显卡状态

```bash
nvidia-smi
```

查空，尝试检测显卡

```bash
sudo apt install nvidia-detect
nvidia-detect
```

于是，就出现了一个令人迷惑的报错

```
Detected NVIDIA GPUs:
1b:00.0 VGA compatible controller [0300]: NVIDIA Corporation GA102 [GeForce RTX 3090] [10de:2204] (rev a1)

Checking card:  NVIDIA Corporation GA102 [GeForce RTX 3090] (rev a1)
Uh oh. Your card is not supported by any driver version up to 545.23.06.
A newer driver may add support for your card.
Newer driver releases may be available in backports, unstable or experimental.
```

这是不合理的，没道理最新版的显卡驱动不支持 3090，不过为了保险起见，我还是去 [NVIDIA 驱动下载界面](https://www.nvidia.com/Download/driverResults.aspx/212964/en-us/) 检查是否真的不支持。当然，结果果然是支持 3090.

## 解决方案

在我不知道到底为什么出现这个问题而反复重启虚拟机时，我突然看到了问题的关键所在。之前，我一直用 ssh 去远程连接虚拟机，但，当我在 VMRC 重启虚拟机时，我看到了在开机的最后出现的这样的错误

```
[   12.699654] NVRM: loading NVIDIA UNIX x86_64 Kernel Module  530.41.03  Thu Mar 16 19:48:20 UTC 2023
[   12.762447] nvidia-modeset: Loading NVIDIA Kernel Mode Setting Driver for UNIX platforms  530.41.03  Thu Mar 16 19:23:04 UTC 2023
[   12.871331] [drm] [nvidia-drm] [GPU ID 0x00000b00] Loading driver
[   12.972022] ACPI Warning: \_SB.PCI0.PE50.S1F0._DSM: Argument #4 type mismatch - Found [Buffer], ACPI requires [Package] (20210730/nsarguments-61)
[   13.732645] NVRM: GPU 0000:0b:00.0: RmInitAdapter failed! (0x26:0x56:1474)
[   13.732697] BUG: unable to handle page fault for address: 0000000000004628
[   13.732784] NVRM: GPU 0000:0b:00.0: rm_init_adapter failed, device minor number 0
```

> （以上错误信息复制自论坛，实际略有差异但基本一致）

在 google 中搜索，得到了 [结果](https://forums.developer.nvidia.com/t/solved-rminitadapter-failed-to-load-530-41-03-or-any-nvidia-modules-other-than-450-236-01-linux-via-esxi-7-0u3-passthrough-pci-gtx-1650/253239/2)。

简单来说，需要安装开放版本的 NVIDIA 驱动而不是默认的。论坛中的回答表示应该使用`.run`文件安装，并附加参数`-m=kernel-open`，我不清楚是否有可以解决这个问题的 deb 包。

在应用这个方案之前，首先需要清理之前的安装。

```bash
sudo nvidia-uninstall
sudo apt purge -y '^nvidia-*' '^libnvidia-*'
sudo rm -r /var/lib/dkms/nvidia
sudo apt -y autoremove
sudo update-initramfs -c -k `uname -r`
sudo update-grub2
sudo reboot
```

然后，从 NVIDIA 驱动下载站下载`.run`格式的驱动。并执行

```bash
sudo ./NVIDIA-Linux-x86_64-525.116.04.run -m=kernel-open
sudo update-initramfs -u
sudo reboot
```

可惜，这么做之后，还是无法解决问题，`nvidia-smi`仍然什么都找不到。不过这个确实有效果，开机的时候不会报那个错了。

经过搜索之后，我在论坛找到了问题的另一部分的 [解决方案](https://forums.developer.nvidia.com/t/nvidia-smi-got-no-devices-were-found-after-nvidia-driver-525-installation-on-ubuntu-20-04-running-with-esxi8-0-passthrough-gtx1650/245142)。

这个解决方案要求在`/etc/modprobe.d/nvidia.conf`（如果没有则创建）加上一行

```
options nvidia NVreg_OpenRmEnableUnsupportedGpus=1
```

重启，问题解决。

最后，按照 [NVIDIA cuDNN 安装文档](https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html#installlinux-deb)，安装 cuDNN，并成功跑起来了几个模型。

![成功结果](https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/cde3baea-80be-4404-0917-8b9d1b718900/small)
