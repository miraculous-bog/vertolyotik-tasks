//Design patterns

// -> Singleton

// об'єкт, який існує лише в одному екземплярі. Новий екз. можна створити лише тоді, коли він не існує - інакше посилання на той екземпляр. В js - об'єктним літералом

// let instance = null;
// function User(name, age) {
//   if(instance) {
//     return instance;
//   }
//   instance = this;
//   this.name = name;
//   this.age = age;

//   return instance;
// }
// const user1 = new User('Peter', 25);
// const user2 = new User('Mark', 24);
// // выводит true
// console.log(user1 === user2);

// -> Модуль.Модуль це основна частин будь - якого js додатку.Це роблять для того аби потім використовувати їх неодноразово.Використовуються для концепту інкапсуляції.Патерн використовує immediately invoked fc expretion, замикання та імітації цієї концепції.

// const myModule = (function() {

//     const privateVariable = 'Hello World';

//     function privateMethod() {
//       console.log(privateVariable);
//     }
//     return {
//       publicMethod: function() {
//         privateMethod();
//       }
//     }
//   })();
//   myModule.publicMethod();

// -> factory

// Вик.для створення фабричних методів.При цьому не треба вказувати класи або ж функції конструктори, які заст.для свторення обєктів.Вик.коли не треба вказувати загальнодоступну логіку їх створення.Вик.різні обєкти при різних умовах.

// class Car {
//     constructor(options) {
//         this.doors = options.doors || 4;
//         this.state = options.state || 'brand new';
//         this.color = options.color || 'white';
//     }
// }
// class Truck {
//     constructor(options) {
//         this.doors = options.doors || 4;
//         this.state = options.state || 'used';
//         this.color = options.color || 'black';
//     }
// }
// class VehicleFactory {
//     createVehicle(options) {
//         if (options.vehicleType === 'car') {
//             return new Car(options);
//         } else if (options.vehicleType === 'truck') {
//             return new Truck(options);
//         }
//     }
// }

// const factory = new VehicleFactory();
// const car = factory.createVehicle({
//     vehicleType: 'car',
//     doors: 4,
//     color: 'silver',
//     state: 'Brand New'
// });
// const truck = factory.createVehicle({
//     vehicleType: 'truck',
//     doors: 2,
//     color: 'white',
//     state: 'used'
// });
// // Выводит Car {doors: 4, state: "Brand New", color: "silver"}
// console.log(car);
// // Выводит Truck {doors: 2, state: "used", color: "white"}
// console.log(truck);
// -> Decorator
// розширює функціонал сущності не вносячи зміни в неї
// class Car {
//     constructor() {
//         // Базовая стоимость
//         this.cost = function () {
//             return 20000;
//         }
//     }
// }
// // Функция-декоратор
// function carWithAC(car) {
//     car.hasAC = true;
//     const prevCost = car.cost();
//     car.cost = function () {
//         return prevCost + 500;
//     }
// }
// // Функция-декоратор
// function carWithAutoTransmission(car) {
//     car.hasAutoTransmission = true;
//     const prevCost = car.cost();
//     car.cost = function () {
//         return prevCost + 2000;
//     }
// }
// // Функция-декоратор
// function carWithPowerLocks(car) {
//     car.hasPowerLocks = true;
//     const prevCost = car.cost();
//     car.cost = function () {
//         return prevCost + 500;
//     }
// }
// const car = new Car();
// console.log('car', car);
// console.log(car.cost());
// carWithAC(car);
// carWithAutoTransmission(car);
// carWithPowerLocks(car);
// console.log(car.cost());

// exmpl2
// class Car {
//     constructor() {
//       this.price = 10000;
//       this.model = 'Car';
//     }

//     getPrice() {
//       return this.price;
//     }

//     getDescription() {
//       return this.model;
//     }
//   }

//   class Tesla extends Car {
//     constructor() {
//       super();
//       this.price = 25000;
//       this.model = 'Tesla';
//     }
//   }

//   class Autopilot {
//     constructor(car) {
//       this.car = car;
//     }

//     getPrice() {
//       return this.car.getPrice() + 5000;
//     }

//     getDescription() {
//       return `${this.car.getDescription()} with autopilot`;
//     }
//   }

//   class Parktronic {
//     constructor(car) {
//       this.car = car;
//     }

//     getPrice() {
//       return this.car.getPrice() + 3000;
//     }

//     getDescription() {
//       return `${this.car.getDescription()} with parktronic`;
//     }
//   }

//   let tesla = new Tesla();

//   tesla = new Autopilot(tesla);
//   tesla = new Parktronic(tesla);
//   console.log(tesla.getPrice(), tesla.getDescription());

//   let tesla2 = new Tesla();

//   tesla2 = new Autopilot(tesla2);
//   console.log(tesla2.getPrice(), tesla2.getDescription());


// ->Facade

//  Цей шаблон забезпечує зручний більш високий рівень
// інтерфейс до більшого масиву коду, приховуючи його істину
// основна складність.
//  Створення набору методів фасаду та їх об'єднання
// одне місце

// class Сonveyor {
//     setBody() {
//       console.log('Body set!');
//     }

//     getEngine() {
//       console.log('Dismantle Engine!');
//     }

//     setEngine() {
//       console.log('Engine set!');
//     }

//     setInterior() {
//       console.log('Exterior added!');
//     }

//     changeInterior() {
//       console.log('Update interior!');
//     }

//     setExterior() {
//       console.log('Added interior!');
//     }

//     setWheels() {
//       console.log('Wheels!');
//     }

//     addElectronics() {
//       console.log('Added electronics!');
//     }

//     paint() {
//       console.log('Car painted!');
//     }
//   }

//   class СonveyorFacade {
//     constructor(car) {
//       this.car = car;
//     }

//     assembleCar() {
//       this.car.setBody();
//       this.car.setEngine();
//       this.car.setInterior();
//       this.car.setExterior();
//       this.car.setWheels();
//       this.car.addElectronics();
//       this.car.paint();
//     }

//     changeEngine() {
//       this.car.getEngine();
//       this.car.setEngine();
//     }

//     changeInterior() {
//       this.car.getInterior();
//       this.car.setInterior();
//     }
//   }

//   const conveyor = new СonveyorFacade(new Сonveyor());

//   const car = conveyor.assembleCar();

// -> Strategy
// Функціонал котрий ми можемо замінити. У шаблоні Strategy ми створюємо об’єкти, які представляють різні стратегії, і об’єкт контексту, поведінка якого змінюється
// за об'єктом стратегії. Об'єкт стратегії змінює алгоритм виконання об'єкта контексту.

// function baseStrategy(amount) {
//     return amount;
// }

// function premiumStrategy(amount) {
//     return amount * 0.85;
// }

// function platinumStrategy(amount) {
//     return amount * 0.65;
// }

// class AutoCart {
//     constructor(discount) {
//         this.discount = discount;
//         this.amount = 0;
//     }

//     checkout() {
//         return this.discount(this.amount);
//     }

//     setAmount(amount) {
//         this.amount = amount;
//     }
// }

// const baseAutoCart = new AutoCart(baseStrategy);
// const premiumAutoCart = new AutoCart(premiumStrategy);
// const platinumAutoCart = new AutoCart(platinumStrategy);

// baseAutoCart.setAmount(50000)
// premiumAutoCart.setAmount(50000)
// platinumAutoCart.setAmount(50000)

// console.log(baseAutoCart.checkout());
// console.log(premiumAutoCart.checkout());
// console.log(platinumAutoCart.checkout());

// -> Oserver

// багато обкт багато класів можуть підписатись на один клас.Клас котрий публікує publisher, ті хто підп. subsribers.

// class AutoNews {
//     constructor() {
//         this.news = '';
//         this.actions = [];
//     }

//     setNews(text) {
//         this.news = text;
//         this.notifyAll();
//     }

//     notifyAll() {
//         return this.actions.forEach(subs => subs.inform(this));
//     }

//     register(observer) {
//         this.actions.push(observer);
//     }

//     unregister(observer) {
//         this.actions = this.actions.filter(el => !(el instanceof observer));
//     }
// }

// class Jack {
//     inform(message) {
//         console.log(`Jack has been informed about ${message.news}`);
//     }
// }

// class Max {
//     inform(message) {
//         console.log(`Max has been informed about ${message.news}`);
//     }
// }

// const autoNews = new AutoNews();

// autoNews.register(new Jack());
// autoNews.register(new Max());

// autoNews.setNews('Hello')

//     -> Mediator
// Посередник.Багато обк яким треба спілкуватися між собою.Медіатор відіграє родь посередника.

// class Person {
//     constructor(name) {
//         this.name = name;
//         this.chatLog = [];
//     }

//     receive(sender, message) {
//         let s = `${sender}: '${message}'`;
//         this.chatLog.push(s);
//         console.log(`[${this.name}'s chat session] ${s}`);
//     }

//     say(message) {
//         this.room.broadcast(this.name, message);
//     }

//     pm(who, message) {
//         this.room.message(this.name, who, message);
//     }
// }

// class ChatRoom {
//     constructor() {
//         this.people = [];
//     }

//     join(p) {
//         let joinMsg = `${p.name} joins the chat`;
//         this.broadcast('room', joinMsg);
//         p.room = this;
//         this.people.push(p);
//     }

//     broadcast(source, message) {
//         this.people.forEach(person => {
//             if (person.name !== source) {
//                 person.receive(source, message);
//             }
//         });
//     }

//     message(source, destination, message) {
//         this.people.forEach(person => {
//             if (person.name === destination) {
//                 person.receive(source, message);
//             }
//         });
//     }
// }

// let room = new ChatRoom();

// let john = new Person('John');
// let jane = new Person('Jane');

// room.join(john);
// room.join(jane);

// john.say('hi room!');
// jane.say('oh, hey John');

// let simon = new Person('Simon');

// room.join(simon);
// simon.say('hi everyone!');

// jane.pm('Simon', 'glad you could join us');

console.log(a);

if (true) {
    let a = 5;
}
console.log(a)