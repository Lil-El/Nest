import 'reflect-metadata';

let target = {};
// Reflect不会对原target对象进行操作
Reflect.defineMetadata('name', 'yxd', target); //添加metadata，不对target做操作
Reflect.defineMetadata('age', '10', target, 'person'); //target 的 person属性添加metadata

function classMetadata(key, value) {
  return function(target) {
    Reflect.defineMetadata(key, value, target);
  };
}
function fnMetadata(key, value) {
  return function(target, prototypeName) {
    Reflect.defineMetadata(key, value, target, prototypeName);
  };
}

// @Reflect.metadata('className', 'Person')
@classMetadata('className', 'Person')
class Person {
  // @Reflect.metadata('fnName', 'hello')
  @fnMetadata('fnName', 'hello')
  hello() {}
}
console.log(Reflect.getMetadata('className', Person));
console.log(Reflect.getMetadata('fnName', Person.prototype, 'hello'));
console.log(Reflect.getOwnMetadata('fnName', Person.prototype, 'hello'));
console.log(Reflect.getMetadata('fnName', new Person(), 'hello'));
console.log(Reflect.getOwnMetadata('fnName', new Person(), 'hello'));
