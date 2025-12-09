let name = "MITHIK"
const age=20
var country = "India"
var c=5+6
console.log(c)
var a=5-6
console.log(a)
var m = 5*6
console.log(m)
var d=10/5
console.log(d)
//== check the value 
//=== check the data type 

console.log(5=="5")
console.log(5==="5")

//function

function greet(name){
    console.log("Hello "+name)
}
greet("Mithik") 

function greet(Age){
    if(Age>=18){
        console.log("Major")
    }
    else{
        console.log("Minor")
    }
}
greet(18)


for (let i =0;i<5;i++){
    console.log(i)
}


let fruitsv=["Apple","Banana","Orange"]
let car = {brand: "toyata", moel: " Camry", year:2020}

console.log(z)
var z =5
// let not possible in this cASE

let co="abc"
co="def"
console.log(co)

// const wilol not use in this case

let q=null
let q1
console.log(q) // null
console.log(q1) //undefined

//switch
/*
const prompt = require("prompt-sync")();

let monthnumber = parseInt(prompt("Enter the month number (1-12):"));
let monthName =""

switch (monthnumber) {
    case 1:
        monthName = "January";
        break;
    case 2:
        monthName = "February";
        break;
    case 3:
        monthName = "March";
        break;
    case 4:
        monthName = "April";
        break;
    case 5:
        monthName = "May";
        break;
    case 6:
        monthName = "June";
        break;
    case 7:
        monthName = "July";
        break;
    case 8:
        monthName = "August";
        break;
    case 9:
        monthName = "September";
        break;
    case 10:
        monthName = "October";
        break;
    case 11:
        monthName = "November";
        break;
    case 12:
        monthName = "December";
        break;
    default:
        monthName = "Invalid month number";
}

console.log("The month is: " + monthName)

*/

let person = {
    firstname : "Mithik",
    age: 20,
    city:"karur"
}
for (let key in person){
    console.log(key + ":" + person[key])
}

let palams = ["Apple","Banana","Orange"]
for(let palam of palams){
    console.log(palam)
}




let vayasu = 20
let access = (vayasu>=18)?  "Allowed" : "Not Allowed"
console.log(access)




const greets = (names) => {
    return `hello, ${names}`
}

console.log(greets("Mithik"))


const numbers=[1,2,3]
const morenum = [4,5,6]
const allnumber=[...numbers,...morenum]
console.log(allnumber)



//object 

const details = {
    name:"Mithik",
    age:20,
    city:"karur"
}

const updateddetails={
    ...details,work:"Erode"
}

console.log(updateddetails)
