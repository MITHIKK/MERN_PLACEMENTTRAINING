const num = [1,2,3];
const [a,b,c]= num
console.log(a,b,c)

const[first, ,third]=num
console.log(first,third)

const[x,y,...rest]=num
console.log(x,y)
console.log(rest)



//onject destructing 

const person = { name:"Mithik", age:20, city:"karur" }
const {name,age}=person
console.log(name,age)


//map // filter // reduce

const numb = [1,2,3,4,5]
const num1 = numb.map(numb=>numb*numb)
console.log(num1)
const evennum = numb.filter(numb=>numb%2===0)
console.log(evennum)



const sum = numb.reduce((accumulator,currentvalue)=>accumulator+currentvalue,0)
console.log(sum)
/*
function sum(...numbers){
    return numbers.reduce((total,numbb)=>total+numbb,0)
}
console.log(sum(1,2,3,4,5))
*/

const arr = [1,2,3]
arr.push(4)
console.log(arr)
arr.push(5,6)
console.log(arr)
arr.pop()
console.log(arr)

arr.unshift(33)
console.log(arr)

arr.shift(3)
console.log(arr)


let str= "Hello world"
console.log(str.length)
console.log(str.charAt(0))
let str1="hello"
let str2 = "world"
console.log(str1.concat(",",str2,"!"))
console.log(str.includes("World"))
console.log(str.indexOf("world"))
console.log(str.substring(0,5))
console.log(str.toUpperCase())
console.log(str.toLowerCase())
console.log(str.replace("world","Mithik"))