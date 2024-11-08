---
title: '函数式响应式编程在 web 开发中的应用'
description: '深入探讨函数式响应式编程（FRP）在大型Web项目中的应用，特别强调了JavaScript在函数式编程中的优势和特点。'
notCompleted: true
pubDate: 'Jan 18 2024'
heroImage: 'https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/d7cb8ec9-52c3-450f-55a0-7f8e00fb5500/small'
---

最近接了几个大型的 web 开发项目，再加上之前写 solid.js 的启发，我对于函数式响应式编程逐渐熟练。函数式响应式编程在大型 web 项目中相当有用。

多练总会有收获，我算是体会到了。没想到能在鄙视链底端的 web 开发中学到鄙视链顶端的 FP 的东西。

## Javascript 是函数式编程正统

最典型的函数式编程语言应该是 Haskell，不过，虽然 Haskell 确实有 [servant](https://docs.servant.dev/en/stable/) 框架，但我想应该没几个人用 Haskell 写 web 服务，因为实在是太痛苦了。

不过，确实有适用于 web 开发的函数式编程语言，比如 [elixir](https://elixir-lang.org/)。这个语言有一个很著名的项目，[policr-mini Telegram Bot](https://github.com/Hentioe/policr-mini) 就是用这个语言写的。除此以外，有个类似 Java 但是支持函数式的编程语言，叫做 Scala. 根据 [GitHub 仓库](https://github.com/twitter/the-algorithm) 推特的算法就用的是这个语言写的。

很多人没有想到 Javascript 这种入门门槛很低，语法极其宽松，一般用于没能力的程序员写前端的语言，是十分适合使用函数式编程写大型 Web 服务的。

V8 引擎的性能其实是不低的，只不过对于小型项目，会占用更多的内存。此外，因为科技进步，现在的开发往往更关注开发成本而不是性能，所以 JS 的性能损失不是那么重要。

### JS 的函数式编程支持

JS 的类型系统十分特别，看上去就好像没有类型一样。这种没有类型让人感觉难以维护，为此，发明了 Typescript. 不过，换个角度，JS 的类型系统实现了函数式编程的要求：

+ 头等函数：函数可以像其他类型一样，作为别的函数的参数、返回值，可以被赋值给变量或存储在数据结构中。显然，JS 可以做到。
+ 闭包：闭包是一个函数以及该函数所捕获的词法环境。JS 程序员常常不动脑子地轻松写闭包，以至于可能导致意外的内存泄漏。
+ 高阶函数：高阶函数是接收函数为参数或者返回函数为结果的函数。JS 非常经常用到高阶函数，比如各种回调，数组（或者一般对象）各种方法，都是高阶函数。

### JS 为什么这么简单

相较于 Rust 这种支持函数式编程的 web 开发常用语言，以及 Haskell 这种支持 web 开发的函数式编程语言，JS 写起来要简单得多。主要是，JS 依赖垃圾回收，有`typeof`关键字，无类型（虽然 TS 有类型，但 TS 的类型都是泛型）。

具体来说，JS 的简单之处在于：

1. 不需要写类型。就算是 Typescript 中，你也可以用`typeof`关键字来提取一个变量的类型并用于类型计算和声明。
2. 不需要考虑闭包变量的生命周期问题。不同于 Rust 那样的零成本抽象或者 C++的手动管理，JS 使用更简单的垃圾回收机制，所以不需要考虑闭包变量的生命周期，也不需要考虑一个闭包是否能够重复调用。
3. Lambda 表达式随便写。就算是对函数式编程一窍不通的人，也能随手用`.map()`之类的方法，并往里面塞一个 Lambda 表达式。

## 函数式编程的基本概念

函数式编程以函数的使用作为构建软件系统的主要手段。它与常见的命令式编程（如面向对象编程）有显著不同。

不同于命令式编程指定机器怎么做，函数式编程着眼于机器要做什么。

要入门函数式编程，理解以下基本概念是非常重要的：

1. **纯函数（Pure Functions）**：这是函数式编程的核心。纯函数指的是输出只依赖于输入的函数，没有隐含的输入（例如捕获外部变量），且执行过程中没有副作用（例如不修改全局状态，不控制 IO）。纯函数十分便于测试。
2. **不可变性（Immutability）**：在函数式编程中，数据是不可变的。这意味着一旦数据被创建，就不能被更改。所有的数据变更都通过创建新的数据结构来实现，而不是更改现有的。这有助于降低程序的复杂性，因为不需要担心数据在程序的不同部分被意外改变。
3. **头等函数（First-Class Functions）**：在函数式语言中，函数被视为“一等公民”，这意味着它们可以像任何其他数据类型一样被传递和操作。你可以将函数作为参数传递给其他函数，从函数返回函数，或将它们存储在数据结构中。
4. **高阶函数（Higher-Order Functions）**：接受其他函数作为参数或者将函数作为返回值的函数。这是函数式编程中组合和抽象的强大工具。
5. **闭包（Closures）**：这是指能够捕获外部作用域中的变量的函数。闭包使得函数即使在其定义环境之外也能使用那些变量。
6. **递归（Recursion）**：由于函数式编程中通常不使用循环结构（如 for 或 while 循环），递归成为执行重复任务的主要方法。
7. **引用透明性（Referential Transparency）**：一个表达式在不改变程序的前提下可以被其计算结果所替换，这种特性称为引用透明性。这意味着函数的调用（例如`add(1,2)`）可以被其输出（例如`3`）替代，而不会对程序的其他部分产生影响。
8. **惰性求值（Lazy Evaluation）**：在函数式编程中，表达式不是在绑定到变量时立即计算，而是在需要其结果时才计算。这可以提高效率，特别是对于大型数据集。
9. **模式匹配（Pattern Matching）**：这是一种检查数据并根据其结构选择不同操作的技术。在一些函数式语言中，模式匹配被用来简化对复杂数据结构的操作。
10. **函数组合（Function Composition）**：在函数式编程中，函数可以通过组合来构建更复杂的操作，即一个函数的输出直接成为另一个函数的输入。
11. **单子（Monad）**：这是一个在函数式编程中常见的抽象概念，用于处理副作用、状态变化等。Monad 提供了一种结构，使得可以顺序地应用一系列函数，同时避免了常见的副作用。

多数前端开发都知道用 jest 做测试，但如果不写纯函数，必定会因为副作用而抓耳挠腮不知道怎么测试。养成写纯函数的习惯是重要的。

## Monad

这个概念值得单独拿出来说，因为有一定理解难度，而且常用。

Monad 这个概念来自于范畴论，被函数式编程语言用于实现惰性求值和延迟副作用。从数学的角度看，Monad 是自函子范畴中的一个幺半群，其二元运算定义为`bind`操作，单位元实现为`return`操作（即恒等变换）。

不过，因为众所周知程序员不学数学，这种话没几个人能听得懂，不如看看这个概念是怎么提出和应用的。

在函数式编程中，我们强调纯函数、没有副作用。不过，在实际的应用中，这是几乎不可能的。比如，在 web 开发中，可能需要用到数据库查询操作、产生随机数操作、数据库写入操作，而这些都是必须依赖副作用的。

我们希望推迟副作用的执行，利用惰性求值，在求值时再执行这些副作用。实现延迟副作用的就是 Monad.

### Promise 是 Monad

JS 中，有一个天然的 Monad，就是 Promise.

Promise 作为 JavaScript 中的一个原生构造，提供了一种优雅的方式来处理异步操作。它可以被看作是 Monad 的一个实例，因为它满足 Monad 的两个基本操作：`bind`（Promise 中的`.then()`方法）和`return`（Promise 中的`Promise.resolve()`）。使用 Promise，我们可以链式调用异步操作，同时保持代码的可读性和可维护性。

比如说你读取配置文件

```javascript
const reading = new Promise((resolve, reject) => {
    const file = fs.readFileSync('./config.json');
    resolve(file);
});

titlePromise = reading.then(file => JSON.parse(file)).then(jsonResult => jsonResult.appName);
title = await titlePromise;
```

在这里，`fetch`函数返回一个 Promise 对象，它代表了一个未来会完成而现在还没有完成的异步操作。

通过`.then()`方法（`bind`），我们可以定义当 Promise 成功时要对数据进行的运算。

在上面的例子中，我们用 monad 将包含副作用的函数（`readFileSync`）进行封装，直到`bind`完成时（即`jsonResult.appName);`的分号那里），都没有执行任何有副作用的操作。直到最后（`title = await titlePromise;`），才执行了有副作用的操作。

想象一下，如何调试上面的代码。对于没有副作用的部分，我们可以用纯函数的调试方法。而对于有副作用的部分，可以单独调试而无须担心后续处理逻辑是否有误。

### Monad 的定义

有了上面的例子，就能更容易理解定义了。现在，来解释自函子范畴中的一个幺半群这种鬼话到底是什么意思。

范畴解释起来挺吃力的，这东西本来就抽象。简单来说，范畴是一堆点连同点之间的箭头。这个点是抽象的点，甚至可以是范畴本身。

一个范畴到另一个范畴的映射叫做函子，如果起点和终点都是自己，那就叫做自函子。当抽象的点是自函子时，所构造出的范畴就是自范畴了。

在数学中，幺半群是一种代数结构，包括一组元素、一个二元运算和一个单位元素。这个二元运算必须是封闭的（运算后的结果在范畴内）、结合的（`(a+b)+c = a+(b+c)`），并且单位元素在这个运算下是中立的（`0+n=n`）。

### 从抽象到实现

monad 被实现为一个数据结构，包含两个方法，有时候还会有`unwrap`方法。

Promise 在 js 和 ts 中是没有 unwrap 的

```typescript
type Monad<A> = Promise<A>;

function pure<A>(a: A): Monad<A> {
  // 因为 return 是关键字，这里用 pure  
  return Promise.resolve(a);
}

function bind<A, B>(monad: Monad<A>, func: (a: A) => Monad<B>): Monad<B> {
  return monad.then(func);
}
```

+ `return`（`pure`）要求返回内容为参数，类型为 Monad 的数据结构
+ `bind`是对值进行计算的纯函数（`bind`不需要知道有`Monad`）

这是一个带有`unwrap`的 Typescript 实现

```typescript
export default interface Monad<T> {
    unwrap(): T;
    bind: <U = T> (func: (value: T) => Monad<U>) => Monad<U>;
}

export function pure<T>(initValue: T): Monad<T> {
    const value: T = initValue;
    return Object.freeze({
        unwrap: () => value,
        bind: <U = T>(func: (value: T) => Monad<U>) => func(value)
    });
}

export const Monad = pure;
```

## 响应式编程与函数式响应式编程

写过 vue 或者 svelte 的读者肯定熟悉这玩意。

简单来说就是，当`a`或者`b`变化时，`a+b`会自动变化。

当我们在使用 vue 开发时，只要一有绑定的数据发生改变，相关的数据及画面也会跟着变动，而开发者不需要写关于「如何通知发生变化」的代码（比如`ref.value = newValue`），只需要关注发生变化时要做什么事，这就是典型的响应式编程。

所以，不难猜到：函数式响应式编程 = 函数式编程 + 响应式编程

函数式响应式编程以 Monad（被观察者序列）处理数据流。前端有这样的框架，利用 monad 的惰性求值实现响应式，将状态以 monad 保存。这个框架叫做 [Solid.js](https://www.solidjs.com/).

自己找用这个框架写的项目，自然就理解了。

> 菜就多练

## 迈出第一步

函数式编程中有 3 种很重要的函数，它们是

1. **Map（映射）**:
   - **作用**：`map` 函数主要用于对集合中的每个元素应用同一个函数，并返回一个新的集合，这个新集合包含了应用函数后的元素。
   - **例子**：比如你有一个数字列表 `[1, 2, 3]`，使用 `map` 函数可以将每个数字乘以 2，结果是 `[2, 4, 6]`。

2. **Reduce（归约）**:
   - **作用**：`reduce` 函数通常用于将一个集合中的所有元素通过某种方式合并成一个单一的结果。它会连续地将操作应用到集合的每个元素和累积到目前为止的结果上。
   - **例子**：如果你有一个数字列表 `[1, 2, 3, 4]`，使用 `reduce` 函数可以将它们相加得到 10（1+2+3+4）。

3. **Filter（过滤）**:
   - **作用**：`filter` 函数用于从一个集合中选出符合特定条件的元素，形成一个新的集合。
   - **例子**：假设你有一个数字列表 `[1, 2, 3, 4, 5]`，使用 `filter` 函数可以选出所有大于 2 的数字，结果是 `[3, 4, 5]`。

这三个函数都是无副作用的，意味着它们不会改变原有的数据集合，而是生成新的集合。这是函数式编程强调“不可变性”的一个重要特征。

在本文写作时，我正在负责 2 个大型 web 全栈项目，其中一个是为我的组织写的闭源的程序，不方便透露；而另一个是开源的。

那个函数式响应式编程的项目名字叫做 [NodeBoard-Core](https://github.com/uarms/NodeBoard-Core)，旨在成为 [v2board](https://github.com/v2board/v2board) 更高性能、更易扩展、更易维护、更便于部署、更安全的上位替代。如果你对这个项目感兴趣，请联系 i@plr.moe