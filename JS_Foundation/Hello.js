const { reverse } = require("dns");

console.log("hello ");
console.log("WEB");
process.stdout.write("Web Dev Learning1");
process.stdout.write("Web Dev Learning2");

let num1 = 10;
let num2 = 20;
let add = num1 + num2;
console.log("");
console.log(add);

let balance = 500;
let balancenew = new Number(50);

console.log(typeof balance);
console.log(typeof balancenew);

console.log(balance.valueOf);
console.log(balancenew);
console.log(balancenew.valueOf);

console.log(balancenew);

// let firstname = "ram";
// let middlename = null;
// let lastname = undefined;

// let name = `Hey ${firstname} ${middlename} ${lastname} have fun`;
// console.log(name);

let firstname = "ram";
let middlename = null;
let lastname = undefined;

firstname = "Shiv";
middlename = "Kumar";
lastname = "Singh";

let name = `Hey ${firstname} ${middlename} ${lastname} have fun`;
console.log(name);

//OBJECT
let userName = {
  // if we ue Const insted of Let the username memory become constant/fix but we can change the value of that object
  first_name: "ram",
  "middle name": "kumar",
  email: "ram@gmail.com",
};

console.log(userName);
console.log(typeof userName);
console.log(userName["middle name"]);

userName.age = 20;

console.log(userName);

console.log(userName.age);

// ARRAY

let NewUser = ["Ram", "Kumar", "30"];
console.log(NewUser[0]);

console.log("-----------");

function whatAmI(input) {
    return `I'm a typeof input!`;
}

