import 'reflect-metadata';

let target = {};
// Reflect不会对原target对象进行操作
Reflect.defineMetadata('name', 'yxd', target); //添加metadata，不对target做操作
Reflect.defineMetadata('age', '10', target, 'person'); //target 的 person属性添加metadata
// console.log(Reflect.getOwnMetadata('name', target));
// console.log(Reflect.getOwnMetadata('age', target, 'person'));

@Reflect.metadata('className', 'Person')
class Person {
  @Reflect.metadata('fnName', 'hello')
  hello() {}
}
console.log(Reflect.getMetadata('className', Person));
console.log(Reflect.getMetadata('fnName', Person.prototype, 'hello'));
