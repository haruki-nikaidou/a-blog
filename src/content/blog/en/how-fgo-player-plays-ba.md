---
title: 'How a former FGO player plays Blue Archive'
description: 'As a former FGO player, how to use timing tactic, buff optimization, and gacha optimization in Blue Archive.'
notCompleted: true
pubDate: 'Nov 17 2024'
heroImage: 'https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/6d4828e4-e61f-4c79-4822-3cfef5800f00/small'
---

<link href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" rel="stylesheet">

Two years ago, I start playing Blue Archive. 

I was a FGO player before, but I deleted my Bilibili account out of dislike for the platform, and since it was the only way to access my FGO China server account, I lost access to the game completely. Starting fresh on the Japanese server would be too difficult to catch up. Besides, since FGO's main value lies in its story, which I can read in either Japanese or English from YouTube, I don't feel the need to continue playing.

After playing Blue Archive for 2 years, I'm confident that I surpass most players in strategy, which stems from from my FGO experience.

## Typical Tactic of FGO Players

All skilled FGO plays must have done these 4 things: **RNG hunting**, **min-maxing the sequence**, **do math before challenging**, **stacking the buffs**. Who hasn't done these things must be a beginner.

RNG hunting doesn't need much explanation, as it's very common. It's seeking perfect card draws or critical hits in FGO, or in similar situation in Blue Archive.

Whether it's daily quests, speed-running challenges, maintaining continuous buffs, or solo boss fights - all of these strategies require careful sequencing. In my opinion, the most impressive examples are the [Mash solo run against Arash in Nero celebration](https://www.youtube.com/watch?v=aBZjzCCJ248) and the [13 Command Spells clear vs Kirschtaria]((https://www.youtube.com/watch?v=yIHW-iOGbQ0)) - with the latter being **designed to be impossible** by the developer, yet players found a way.

Though most FGO players don't memorize the complete damage formula, they understand the basics of the four buff categories and their stacking mechanics.

> There are four main buff categories in FGO's damage calculation. 
> Buffs of the same category (like ATK up and DEF down) add together linearly - for example, +10% ATK and -10% enemy DEF equals +20% ATK. 
> Different categories of buffs multiply with each other, leading to diminishing returns when stacking same-type buffs, as 
> 
> $$(1+a)(1+b)=1+a+b+ab>1+a+b$$ 
> 
> This is why combining buffs from different categories is generally more effective than stacking buffs of the same category.

Since FGO lacks an auto-clear system, players must complete daily quests manually, turning these routine tasks into mini speed-running challenges. 
To achieve efficient farming, players need 10 specific servants, with 6 of them being limited 
(Koyanskaya of Light, Altria Caster, Oberon, Merlin, Scáthach-Skadi Ruler, Scáthach-Skadi Caster). 
For new players, the only way to obtain this optimal farming setup is to purchase an account from other players, 
as collecting all these limited servants would be practically impossible.

## Migrate the Tactics into Blue Archive

### Stacking Buffs

Everyone plays Blue Archive knows stacking buffs like mika + ui + ako + kisaki system. But that's far from the maximum.

I use [Schale DB](https://schaledb.com/) to query the values of students.

### Damage Formula in Blue Archive

The damage formula in Blue Archive is far from FGO. There is no buff categories in Blue Archive.

There is no buff categories in Blue Archive just because there is no many chance you can stack more than 4 type of buffs.
Although there are rarely-used students with special systems like Yoshimi (Band) in the Sugar Rush Band system, 
it is very uncommon to stack multiple buffs in a single EX skill.

Like all anime games, all different types of buffs in Blue Archive is multiplied with each other. You can understand these buffs easily:

- ATK up
- Weak (x2) / Effective (x1.5) / Resist (x0.5)
- Crit DMG up
- EX Skill DMG Dealt
- Effectiveness up
- Combat power: from SS (1.3x) to D (0.8x), 0.1 is the step
- Damage Dealt up

Like FGO, there is also stability in Blue Archive. Stability determines how stable the damage is. The range is 

$$
\left[  \frac{Stb}{Stb+1000}+0.2,  \ 1  \right]
$$

Mika's stability is very low at 1376. In Insane or higher difficulty, 
Binah reduces stability by 50%, which means players need more attempts to achieve optimal damage due to the increased damage variance.

Level insufficiency is a hidden damage reduction factor that many players are unaware of. 
When a student's level is lower than the enemy's, damage is reduced by 2% for each level difference, up to a maximum reduction of 60%.

I guess the level insufficiency mechanic becomes particularly relevant when a new raid difficulty is introduced,
as there are few other situations where students' levels fall below enemy levels. 
This serves as a special challenge for top players. When a new raid difficulty launches, 
the boss's level always exceeds the maximum student level, making it extremely difficult, conquerable only by top players. 
Achieving a two-digit ranking under these conditions provides them with a significant sense of accomplishment.

The reduction rate of DEF is similar to League of Legends:

$$
\frac{\frac{5000}{3}}{\frac{5000}{3} + Def}
$$

When both flat value and percentage-based buffs are present, flat value modifications are always applied first. 
For example, actual DEF = (Base DEF - Flat Defense Piercing) * (1 - Defense Piercing Rate).

Attention that unlike FGO, where you can stack multiple buffs through sequencing tactic, in Blue Archive,
buffs from **identical or similar** skills (such as Himari's EX and Kotama Camp's EX) will be **overridden** when applied multiple times.

### Sequencing Tactic

Sequencing in Blue Archive is much more difficult than in FGO. 

Unlike the turn-based FGO, Blue Archive features a continuous timeline and a skill circular queue.

