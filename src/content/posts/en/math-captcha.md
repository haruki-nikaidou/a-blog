---
layout: '../../../layouts/PostLayout.astro'
title: 'Math CAPTCHA js lib'
language: 'en'
description: ''
enableKatex: true
---

According to the performance of GPT4, it seems that AI can't solve geometric problems well. So, simple geometric problems, like calculating the area of a triangle whose base and height is known, can serve as a CAPTCHA.

Thus, I developed [math-captcha-js](https://github.com/haruki-nikaidou/math-captcha-js).

## Problem Paradigms

There are some paradigms which which can be selected to generate problems.

+ `triangle-area-easiest`: Calculate the area of a triangle whose base and height is known. They even can be solved by elementary school students.
+ `triangle-area-easy`: Calculate the area of a triangle where one of the sides of the triangle is the diameter of the circle. The length of the base or the height needs to be derived using the Pythagorean Theorem.
+ `triangle-area-hard`: **Use this only if you can ensure that the user can solve the problem!** Calculate the area of a triangle for which the lengths of three sides are known. *(Because of number theory, there is no guarantee that the solution is an integer. So the solution retains 2 decimal places.)*
> *Heron's formula:*
>
> Assuming the length of 3 sides are $a$, $b$, and $c$, let
>
> $$
> s = \frac{a+b+c}{2}
> $$
>
> The area of the triangle is 
> $$
> A=\sqrt{s(s-a)(s-b)(s-c)}
> $$
+ `triangle-area-insane`: **Use this only if you can ensure that the user can solve the problem!** Solve the triangle and then calculate the area. The sine theorem and Stewart's theorem are usually required.

> *Stewart's theorem*
> 
> For triangles like this:
> 
> ![Stewart's theorem Figure](./math-captcha-1.svg)
>
> There are:
>
> $$
> t^2 = \frac{b^2u+c^2v}{a} -uv
> $$
>
> or,
>
> $$
> c^2v+b^2u=t^2a+uva
> $$
>
> Besides that, there is
>
> $$
> \frac{\sin \angle BAC}{t} = \frac{\sin \angle BAD}{c} + \frac{\sin \angle CAD}{b}
> $$
+ `line-length-easiest`: Use the properties of circles and parallelograms to get the length of a line segment in a few steps of addition and subtraction.
+ `line-length-easy`: Add the collinear theorem and similar triangles to the `line-length-easiest`.
+ `line-length-cube`: Like `line-length-easy`, but on cube.


## On processing...