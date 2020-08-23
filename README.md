# Nest.js学习笔记

### 概念
Nest是一套基于Node.js的强大的Web框架，可帮助你轻松构建出高效的、可扩展的应用程序。它是通过结合OOP（面向对象编程）和FP（函数式编程）的最佳理念，采用现代化JavaScript，使用TypeScript构建的。

### 特点

- 基于著名的（Express/Scoket.io)库。
- 非常有用的依赖注入，内置控制反转容器。
- 分层注入器器—通过使用类型注入创建可重用、松耦合的模块，从而在应用程序中增加抽象性。
- WebScokets模块（基于scoket.io，虽然你可以使用任何其他使用适配器的库。
- 独特的模块化系统（将你的系统分割成克重用的模块）。
- 消息类型支持的反应微服务（内置transport属性，决定使用TCP或者Redis，但是你可以选择使用任何其他使用CustomTransportStrategy的交流形式）。
- 异常处理layer，异常过滤器，同步和异步pipes layer。

## 核心概念
>应用程序构建块：1. 模块 2. 控制器 3. 组件
- 模块：
  使用带有@Module装饰器的类，模块只能在其内部使用组件/控制器。 我们可以将组件实例导出（只有组件可以被导出），这样模块之间就可以共享组件实例
- 控制器：
  使用带有@Controller()装饰器的类，负责处理传入的HTTP请求
- 组件：
  几乎所有事物都可以看作一个组件，可以通过构造函数将组件注入到控制器或者另一个组件中。

### 使用

```
nest g controller products

nest g service products

nest g module products
```