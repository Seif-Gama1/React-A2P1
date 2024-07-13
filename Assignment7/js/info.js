//effictively all file functions are declared here
//followed by variables e.g: var result1;

//Function definition
var x=3,y=5;
function sum2Numbers( num1 ,  num2){
    if(typeof num1==="number" && typeof num2==="number")
        console.log( num1 + num2 );
    else
        console.log("Invalid input");
    return num1+num2;
}

//Note that u can make a function call with less or more parameters in JS with no errors
var res = sum2Numbers(x,y);
console.log("res = "+ res);
// "hamada" + null = "hamadanull"

//function expression
var sum2numbersss=function(x,y){
    return x+y;
}
// console.log(sum2Numbers); //prints the actual code lines of the function

var res= sum2numbersss(2,3);
console.log(res);


//Hoisting concept: all functions effectively have a declaration in first lines of code in the file to be compiled
//Followed by declaration for variables
//So:
console.log(result1); 
console.log(diff(5,3));
function diff(num1, num2){
    return num1-num2;
    console.log(result1);
}
var result1=diff(5,3);


var x=6,y=7;

function hamada(num1,num2){
    console.log(x+y);
    console.log(num1+num2);
}
//console.log(num1 + num2); // gives error as num1 and num2 are only defined in function's scope

hamada(11,12);


//Assuming we have array: a[5] ... now a[6] prints undefined


//Objects:
var hamada={
    fname:"mohsen",
    lname:"Micheal",
    age:23
}
hamada.pets=3;
console.log(hamada);