# Nest.js 学习笔记

### 概念

Nest 是一套基于 Node.js 的强大的 Web 框架，可帮助你轻松构建出高效的、可扩展的应用程序。它是通过结合 OOP（面向对象编程）和 FP（函数式编程）的最佳理念，采用现代化 JavaScript，使用 TypeScript 构建的。

### 特点

- 基于著名的（Express/Scoket.io)库。
- 非常有用的依赖注入，内置控制反转容器。
- 分层注入器器—通过使用类型注入创建可重用、松耦合的模块，从而在应用程序中增加抽象性。
- WebScokets 模块（基于 scoket.io，虽然你可以使用任何其他使用适配器的库。
- 独特的模块化系统（将你的系统分割成克重用的模块）。
- 消息类型支持的反应微服务（内置 transport 属性，决定使用 TCP 或者 Redis，但是你可以选择使用任何其他使用 CustomTransportStrategy 的交流形式）。
- 异常处理 layer，异常过滤器，同步和异步 pipes layer。

## 核心概念

> 应用程序构建块：1. 模块 2. 控制器 3. 组件

- 模块：
  使用带有@Module 装饰器的类，模块只能在其内部使用组件/控制器。 我们可以将组件实例导出（只有组件可以被导出），这样模块之间就可以共享组件实例
- 控制器：
  使用带有@Controller()装饰器的类，负责处理传入的 HTTP 请求
- 组件：
  几乎所有事物都可以看作一个组件，可以通过构造函数将组件注入到控制器或者另一个组件中。

### 使用

```
nest g controller products

nest g service products

nest g module products
```

## DI/Ioc：依赖注入、控制反转

A 对象不需要实例化 B 对象，而是由一个容器去创建 B 对象，并注入给 A 对象使用；A 也不需要去关系 B 是如何生成的，什么时候生成的。
Module 是容器（Ioc）；controller 使用 service（DI）
