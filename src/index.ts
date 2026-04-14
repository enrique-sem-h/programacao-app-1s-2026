import promptSync from "prompt-sync";

const prompt = promptSync();

const name: string = prompt("Type in your name: ");
let age: string = prompt("Type in your age: ");

if (!parseInt(age)) {
  age = prompt("Please type in a number: ");
}

const futureAge: number = parseInt(age) + 10;

console.log(`${name}, in 10 years your age will be `, futureAge, "years");
