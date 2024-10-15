---
title: '前 FGO 玩家是怎么玩碧蓝档案的'
description: '作为前 FGO 玩家，在碧蓝档案中延续传统技巧：打轴、叠 buff 、算极限伤害。'
pinned: true
pubDate: 'Nov 28 2023'
heroImage: 'https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/6d4828e4-e61f-4c79-4822-3cfef5800f00/small'
---

<link href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" rel="stylesheet">

今年，入坑了碧蓝档案。以前是玩 BGO 的，在等国服剧情和先前看的日服剧情对接上之后，果断弃游，谁给陈睿送钱谁傻逼。
玩了大半年，多少算入了个门。不过 FGO 的很多习惯对我玩碧蓝档案影响很深。

## FGO 玩家的传统艺能

玩 FGO 一定少不了这四件事：凹、打轴、代公式、叠 buff. 如果没做过这几件事，可以认为 FGO 还没有入门，或者只会抄作业。

凹不用多说，凹发牌，凹暴击，这个在碧蓝档案也是常见的。

刷日常、打 3T~6T、保鲜术、单挑，都离不开打轴。要说打轴的经典题，莫过于「流星如雨」。有人用卓越的打轴技术，[用玛修单挑过了流星如雨](https://www.youtube.com/watch?v=aBZjzCCJ248)。更有甚者，用精彩绝伦的打轴技术，强行通过了在设计上**本应必输无疑**的关卡，也就是 [「13 划令咒强杀队长」](https://www.youtube.com/watch?v=yIHW-iOGbQ0)。

即使很多玩家并不熟悉 FGO 的伤害计算公式，但他们很可能也知道 A, B, C, D 四类 buff 和 buff 稀释原理。

简单来说，不同种 buff 之间乘，相同 buff 之间加。假设一个 buff 提供的伤害加成为$$a$$，另一个为$$b$$。如果两个 buff 是同种类的，那么合起来就是$$(1+a+b)$$；但如果两个 buff 是不同种类的，合起来就是$$(1+a)(1+b)=1+a+b+ab>1+a+b$$。

由于 FGO 的设计，即使是日常，一般也需要叠不少的 buff。如果一个新人想要入坑 FGO，那么他必须要有以下角色才能叠够足够的 buff（截止到作者弃游前）： 梅林、玉藻前 Caster、刑部姬、诸葛孔明-埃尔梅罗二世、斯卡蒂 Caster、保罗·班扬、南丁格尔、光之高扬斯卡娅、阿尔托莉娅 Caster、奥伯龙……

## 把 FGO 的技术带入碧蓝档案

叠 buff 自不用说，我认为大多数人都知道未花+优+亚子+日鞠那一套 buff 体系。但这远非叠 buff 的上限。

考虑以下 BINAH 组队：未花、优、水优、朱音、亚子、日鞠。完全体的未花应该有这些 buff：

+ 49.4%贯穿特效（未花技能）
+ 攻击力增加 26.6%（未花技能）
+ 增加造成伤害的 24.2%（未花技能）
+ EX 开销减半
+ 攻击力增加 16.1%（优的 EX）
+ 会心增加 25.9%（优的技能）
+ 攻击速度增加 45.9%（优的技能）
+ 70.1%+28.9%的贯穿特效（水优的 ex 和技能）
+ 攻击力增加 43.1%（水优的技能）
+ 对方降低防御 37.7%（朱音的 EX）
+ 会心增加 39.5%（亚子 EX）
+ 暴击伤害增加 73.3%+17.3%（亚子 EX 和技能）
+ 攻击力增加 105%（日鞠 EX）
+ 闪避无关紧要，所以忽略

合计，buff 有：

+ EX 开销减半
+ 148.4%贯穿特效
+ 攻击力增加 190.8%
+ 增加造成伤害的 24.2%
+ 会心增加 65.4%
+ 攻击速度增加 45.9%
+ 对方降低防御 37.7%
+ 暴击伤害增加 90.6%

这么多的 buff，即使是在 FGO 中，也相当罕见，通常只有过牌和保鲜才能实现。

积累 buff 很考验打轴技巧。因为碧蓝档案是按时间而不是按回合的，这就使碧蓝档案的打轴更接近文明 6 的那种细小的打轴而不是 FGO 那种粗大的打轴。

一般情况下，碧蓝档案打轴是按秒为刻度的，这是因为大多数的 buff 的持续时间是整数秒。不过，有些时候，因为多个 buff 同时存在的时间很小，所以会遇到局部以 0.5 秒甚至 0.1 秒为刻度进行打轴。有些操作，例如后手拐（比如：在未花放出 ex，但还没有引爆时，日鞠给 ex。这种做法可以略微增加伤害。），也需要精细操作。所以碧蓝档案的打轴体验和 FGO 完全不同。

接下来说说碧蓝档案的伤害公式怎么套

## 伤害公式

碧蓝档案的伤害计算公式与 FGO 很接近，除了防御部分。防御部分类似于 LOL 的$$ \frac{100}{100+D}$$。

公式看起来很长，但实际上就是一些因素简单相乘。

### 第一部分：伤害计算起点

类似于 FGO，碧蓝档案的伤害计算起点是：

$$
Atk \times Skr \times Hitr \times Us
$$

+ 基础面板$$Atk$$
+ 技能伤害倍率$$Skr$$
+ hit 分割$$Hitr$$
+ 伤害浮动$$Us$$

不过，不同于 FGO，碧蓝档案的伤害浮动程度是可变的。决定伤害浮动程度的属性为安定值$$Stb$$，角色之间的安定值有差异。浮动范围为：会根据安定值$$Stb$$浮动到原来伤害的$$Us$$倍，其中

$$
Us \in\left[  \frac{Stb}{Stb+1000}+0.2,  \ 1  \right]
$$

未花的安定值比较低，只有 1376，IS 下，大蛇还会降低 50%安定，这会使得未花最低只能造成原来伤害的 61%。

### 第二部分：属性克制、地形、等级倍率

在起点之后，是属性克制、地形、等级倍率$$Atr$$.

$$Atr$$由三种因素相乘得出。

+ 等级：每比敌人低 1 级，则减伤 2%，至多减伤 60%
+ 地形：以 10%为梯度，最高为墨镜+30%，最低为大哭-20%
+ 克制：克制时造成 200%伤害，被克制时造成 50%伤害，Effective 克制造成 150%伤害

不同于 FGO 严重的 buff 稀释，碧蓝档案的 buff 稀释要轻微得多。碧蓝档案只有同名 buff 会稀释，没有 FGO 的 buff 种类稀释问题（在 fgo 中，加攻和降防是同类 buff，按照加法计算）。

### 第三部分：buff 因素

影响伤害的 buff 因素有：

+ 敌方防御$$Arm$$（可以通过 buff 降低）
+ 暴击倍率$$Crr$$（受多种因素影响）
+ 敌方减伤率$$Red$$
+ 我方增伤率$$Inc$$
+ 克制特效$$Eff$$

这些影响都是相乘的。

防御减伤的计算类似英雄联盟，对于防御为$$Def$$的敌人，敌人实际受到的伤害为

$$
\frac{\frac{5000}{3}}{\frac{5000}{3} + Def}
$$

我不知道为什么选择了$$\frac{5000}{3}$$这个诡异的数字，英雄联盟选择的数字是 100。不过，有趣的是，拥有 5000 防御的 IS 大蛇实际受到的伤害为$$\frac{1}{4}$$，意外的是一个比较好看的分数。可能其他 boss 也是这样。

对于定额和百分比降防，定额优先计算。也就是说，实际防御=（初始防御-定额降防）*（1-百分比降防）

减伤率改变和增伤率改变，均是定额优先计算。

克制特效是当你的伤害克制对方护甲时，独立增加伤害。例如，水星野在 EX 内打轻甲会造成额外的 99%伤害。这个伤害翻倍是直接独立乘上去的，和前面提到的$$Atr$$中的克制因素是分开的。于是水星野就造成了 4 倍克制而不是 2 倍。

暴击倍率的计算有些复杂，因为有加暴击倍率的 buff，也有减少受到的暴击的暴击倍率的 buff.

首先是自己这边，暴击倍率是（基础暴击倍率 200% + 装备暴击倍率 + 按值增加的技能）*（1+按百分比增加的技能）

对于敌人那边，暴击抵抗倍率是（基础暴击抵抗 50% + 装备暴击抵抗 + 按值增加的技能）*（1+按百分比增加的技能）

而最终计算伤害的暴击倍率是：暴击倍率减去暴击抵抗倍率。

## 打轴

碧蓝档案的打轴比 fgo 简单得多。

通常来说，fgo 要求在 3 到 6 回合内消灭敌人，但是一共只有 6 个人、18 个技能、6 个宝具，而且同一时间只有 3 个人可以上场。fgo 中很多 buff 的持续时间是 3 回合，有些强力 buff 甚至是 1 回合（比如梅林的 3 技能提供 1 回合 100%暴击伤害）。有些敌人有多条生命值槽，一回合只能打掉一条（有个别例外），并且在击破一个槽的时候，会释放强力技能，这是很棘手的。有些时候，甚至有必要使用动态规划等算法技术来在尽量短的时间内消灭具有 4 个或者以上生命值槽的敌人。

碧蓝档案则完全没有那么复杂。一般来说，你不可能在一个强力 buff 的持续时间内转完两轮技能，而且同一个技能的效果会覆盖，所以没必要特别仔细地打轴来让 buff 超量叠加。不过泳装花子是个例外，花子的被动技能让她可以连续释放 3 次 ex，而且 ex 只有 2 费，所以可以打出惊人的爆发。

另外，碧蓝档案的被动技能带来 buff 具有明显的周期性质，只要 cost 控制在合理的范围，一般能够轻易地利用好每一次被动技能带来的 buff。主动技能的释放时机也不难控制。

## 数学建模与优化问题

接下来讲一个 fgo 用不到，但碧蓝档案常用的技术——数学建模。

幸运的是，人类的游戏设计师很少出类似 [心之钢](https://leagueoflegends.fandom.com/wiki/Heartsteel) 这种在数学上比较难以处理的东西。在碧蓝档案中，一般情况下，数学建模的方法大多是模拟战斗，而不需要处理差分方程之类的难受情况。这种粗略的建模在很多情况可以比较精确地算出能够造成的伤害。

但是，有些是例外。未花的 EX 所造成的伤害取决于目标的生命值与最大生命值的比例，在这种情况下，差分方程是必须的。我曾经建模并计算过未花造成的伤害是如何被各种因素影响的，但是，那份文件的唯一件被放在了一个 telegram 群中，而那个群已经被解散了。以后可能会重新计算。

一般情况下，普通攻击造成的伤害是可以被看作均匀的。因为大数定律，安定值、暴击对普通攻击的影响一般可以被忽略。所以，一般来说，只需要计算技能、ex 技能的使用周期和伤害就行了。最简单的办法就是总是假设 ex 吃满 buff，小技能没有 buff.

在有些战斗中，找到一个合适的模型是困难的，因为这些战斗很依赖机制，简单的计算不能考虑到机制问题。比如格里高利。

除了伤害，有时候还需要考虑奶量和坦度。典型的例子有主教的灯和水优打大蛇。这些也可以简单按照技能周期和数值来计算。

真正的难点在于计算多刀的总力战。

假设你有$$n$$个前排学生和$$m$$个后排学生可选，不考虑借人，在$$t$$刀时，你有

$$
\prod_{i=0}^{t-1} C_{n-4i}^{4}C_{m-2i}^{2}
$$

种组队方法。

近似地，你有$$\Theta(n^{4t})$$种组队方法

对于刀数来讲，模拟战斗来找出最优解的时间复杂度是指数的，而对于可选学生数，时间复杂度是幂函数的。

以我自己为例，我有 36 个后排学生和 76 个前排学生，如果我打 3 刀，那么我的组队方法有大约$$1.88*10^{26}$$种。逐个模拟战斗显然是不可行的。

不过，如果能对单场战斗进行足够精确的建模，可以通过强化学习的方法，探索出一个近似最优解。尽管同样需要花费大量时间，但至少可以在人多的情况算出来。

## 走位与控制

在某些总力战中，走位非常重要。比如 goz 要求二阶段走到真身前，黑白可以通过走位躲开技能。fgo 没有走位，但是有嘲讽。一般来说，fgo 的嘲讽对于 boss 也是有效的，因为属于增益效果而不是对 boss 的控制。

fgo 的大多数 boss 和高难都是没有免疫控制的，一般也没有免疫减益效果。因此，很多 boss，尤其是男性 boss，可以被活活控死。典型就是 [戈耳工别动队](https://fgo.wiki/w/FGO%E9%BB%91%E8%AF%9D%C2%B7%E6%A2%97%C2%B7%E6%88%90%E5%8F%A5/%E9%98%9F%E4%BC%8D%E6%90%AD%E9%85%8D/%E6%88%88%E8%80%B3%E5%B7%A5%E5%88%AB%E5%8A%A8%E9%98%9F)。而在碧蓝档案中，控制技能用处不大，一般用于依赖控制的总力战，比如 hod。不能用来增加伤害的减益也用处不大，但有极个别 boss 依赖于减益数量，比如格里高利。不过，fgo 中，这种减益经常用来减轻生存压力，甚至可以用来过 boss，比如经典的 [魔神王也走不出来的迷宫](https://www.youtube.com/watch?v=lEnwQEIYbac)。

## 总结

虽然碧蓝档案对于角色数量的要求也和 FGO 一样比较高，不过，碧蓝档案的抽卡难度比 FGO 低太多太多了。FGO 的剧情大多是不错的，即使是现在，我也会去追 FGO 的剧情。不玩国服是常识，谁玩 BGO 或者中东档案谁就是傻逼。

碧蓝档案和 FGO 都属于没什么游戏性但是剧情有意思的。不过，碧蓝档案的日常有扫荡，而且不用日常精打细算组队就很舒服。说到底 FGO 还是太肝了。多刀计算是 FGO 中没有的难题，FGO 的各类技术基本上也都能有效运用。

我永远喜欢白洲梓！