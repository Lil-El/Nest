# Nest.js 学习笔记

## 概念

Nest 是一套基于 Node.js 的强大的 Web 框架，可帮助你轻松构建出高效的、可扩展的应用程序。它是通过结合 OOP（面向对象编程）和 FP（函数式编程）的最佳理念，采用现代化 JavaScript，使用 TypeScript 构建的。

## 核心概念

> 应用程序构建块：1. 模块 2. 控制器 3. 组件

- 模块：
  使用带有@Module 装饰器的类，模块只能在其内部使用组件/控制器。 我们可以将组件实例导出（只有组件可以被导出），这样模块之间就可以共享组件实例
- 控制器：
  使用带有@Controller()装饰器的类，负责处理传入的 HTTP 请求
- 组件：
  几乎所有事物都可以看作一个组件，可以通过构造函数将组件注入到控制器或者另一个组件中。

### 特点

- 基于著名的（Express/Scoket.io)库。
- 非常有用的依赖注入，内置控制反转容器。
- 分层注入器器—通过使用类型注入创建可重用、松耦合的模块，从而在应用程序中增加抽象性。
- WebScokets 模块（基于 scoket.io，虽然你可以使用任何其他使用适配器的库。
- 独特的模块化系统（将你的系统分割成克重用的模块）。
- 消息类型支持的反应微服务（内置 transport 属性，决定使用 TCP 或者 Redis，但是你可以选择使用任何其他使用 CustomTransportStrategy 的交流形式）。
- 异常处理 layer，异常过滤器，同步和异步 pipes layer。

### 使用

```
nest g controller products

nest g service products

nest g module products
```

## DI/Ioc：依赖注入、控制反转

A 对象不需要实例化 B 对象，而是由一个容器去创建 B 对象，并注入给 A 对象使用；A 也不需要去关系 B 是如何生成的，什么时候生成的。
Module 是容器（Ioc）；controller 使用 service（DI）

## Module

### 功能模块

Target：在 CatsController 中使用 CatsService

我这里不直接即将 CatsC 和 S 注册 AppModule 下；以以下结构使用；

```
--AppModule
  --UserModule
    --CatsModule
```

```
AppModule:
  @Module({
    imports: [UserModule],
    controllers: [],
    providers: [],
  })
```

```
UserModule:
  @Module({
    imports: [CatsModule],
    controllers: [],
    providers: [],
  })
```

```
CatsModule:
  @Module({
    controllers: [CatsController],
    providers: [CatsService]
  })
```

1. 在 AppModule 中 imports 导入 UserModule；
2. 在 UserModule 中 imports 导入 CatsModule；
3. 创建 CatsModule 的传入 controllers 和 providers 数组

### 共享模块

Target: 在 AppController 和 UserController 中使用 CatsController

```
- AppModule
    - CatsModule
    - UserModule
      - CatsModule
```

```
AppModule:
  @Module({
    imports: [UserModule, CatsModule],
    controllers: [],
    providers: [],
  })
```

```
UserModule:
  @Module({
    imports: [CatsModule],
    controllers: [],
    providers: [],
  })
```

```
CatsModule:
  @Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
  })
```

在**功能模块**基础上：

1. CatsModule 的 exports 导出 CatsService
2. AppModule 中 imports 导入 CatsModule
3. UserModule 中 imports 导入 CatsModule

### 模块导出

UserModule 中导入了 CatsModule，App 导入了 User；为了在 AppConatroller 中使用 CatsController，我们在 AppModule 中 imports 导入了 CatsModule；这样 Cats 就被又导入了一次；

```
UserModule
@Module({
  imports: [CatsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [CatsModule],
})
```

使用**模块导出**，在 UserModule 中 exports 导出 CatsModule，这样 AppModule 就无须导入 CatsModule 也可以调用 CatsService

### 全局模块

因为 CatsModule 在 User 和 App 都使用了，需要在 User 中进行导入导出；可以将其配置为全局模块，只需在 App 模块中进行注册，即可在所有模块中使用 CatsService，想要使用 CatsService 的模块则不需要在 imports 数组中导入 CatsModule。

```
CatsModule
@Global
@Module
```

### 动态模块

- 参考 animals.module；在某个模块中注册之后，还可以再将其导出；
- 设置 global，设置为全局模块，User 不导入，也可以使用
- animals.module 返回包含 controller，就可以访问/cats；否则只能是用 CatsService；

## 中间件

- 类中间件
- 函数中间件
- 全局中间件

## 异常

- 内置异常类
- 基础异常类
- 自定义异常

### 异常过滤器

- 全局过滤
- 单个 controller 方法的过滤
- 模块的过滤：App_Filter token
- 继承基础类的异常

## 管道

### 内置

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe

### 范围

- 单个参数
- 单个路由
- 全局
- 模块
