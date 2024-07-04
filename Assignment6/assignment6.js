// Assignment:

////Q1
// do{
// var q1 = prompt("Please Enter Q1 number");
// }
// while( isNaN(Number(q1)));
// console.log("Value of q1 is: " + q1);

////Q2
// do{
//     var q2 = prompt("Please Enter Q2 number");
// }
// while( isNaN(Number(q2)));
// if(q2%3==0 && q2%4==0){
//     console.log("Yes");
// }else{
//     console.log("No");
// }

////Q3
// do{
//     var q31 = prompt("Please Enter Q3 First number");
// }
// while( isNaN(Number(q31)));
// do{
//     var q32 = prompt("Please Enter Q3 Second number");
// }
// while( isNaN(Number(q32)));
// if( Number(q32) > Number(q31) ){
//     console.log(q32);
// }else{
//     console.log(q31);
// }

////Q4
// do{
//     var q4 = prompt("Please Enter Q4 number");
// }
// while( isNaN(Number(q4)));
// if(Number(q4)<0){
//     console.log("Negative Number");
// }else if(Number(q4)==0){
//     console.log("Zero");
// }else{
//     console.log("Positive Number");
// }



////Q5
// do{
//     var q51 = prompt("Please Enter Q5 First number");
// }
// while( isNaN(Number(q51)));
// do{
//     var q52 = prompt("Please Enter Q5 Second number");
// }
// while( isNaN(Number(q52)));
// do{
//     var q53 = prompt("Please Enter Q5 Third number");
// }
// while( isNaN(Number(q53)));
// if( Number(q51) > Number(q52) && Number(q51) > Number(q53) ){
//     console.log("First Number was greatest " + q51);
// }else if( Number(q52) > Number(q51) && Number(q52) > Number(q53) ){
//     console.log("Second Number was greatest " + q52);
// }else{
//     console.log("Third Number was greatest " + q53);
// }

////Q6
// do{
//     var q6 = prompt("Please Enter Q6 number");
// }
// while( isNaN(Number(q6)));
// if( Number(q6) % 2 ==0){
//     console.log(q6 + " Is Even");
// }else{
//     console.log(q6 + " Is Odd");
// }

////Q7
// do{
//     var q7 = prompt("Please Enter Q7 character");
// }
// while( !isNaN(Number(q7)));
// if( q7=="a" || q7=="e" || q7=="i" || q7=="o" || q7=="u"){
//     console.log(q7 + " Is Vowel");
// }else{
//     console.log(q7 + " Is Consonant");
// }

////Q8
// do{
//     var q8 = prompt("Please Enter Q8 number greater than 2");
// }
// while( ( isNaN(Number(q8)) ) || Number(q8) < 3);
// for(var i=2; i<q8 ; i++){
//     console.log(i);
// }

////Q9
// do{
//     var q9 = prompt("Please Enter Q9 number");
// }
// while( isNaN(Number(q9)) );
// for (var i=1 ; i<13; i++){
//     console.log( String(i) + " * " + String(q9) + " = " + i*q9);
// }

////Q10
// do{
//     var q10 = prompt("Please Enter Q10 number");
// }
// while( isNaN(Number(q10)) );
// console.log("Even Numbers: ");
// for(var i=2 ; i<q10 ; i++){
//     if(i%2==0){
//         console.log(i);
//     }
// }

////Q11
// do{
//     var q11p1 = prompt("Please Enter Q11 First number");
// }
// while( isNaN(Number(q11p1)) );
// do{
//     var q11p2 = prompt("Please Enter Q11 Second number");
// }
// while( isNaN(Number(q11p2)) );
// console.log(String(q11p1) + " Power " + String(q11p2) + " = " + Math.pow(q11p1,q11p2));

////Q12
// var q12p1 = prompt("Please Enter Q12 First Grade");
// var q12p2 = prompt("Please Enter Q12 Second Grade");
// var q12p3 = prompt("Please Enter Q12 Third Grade");
// var q12p4 = prompt("Please Enter Q12 Fourth Grade");
// var q12p5 = prompt("Please Enter Q12 Fifth Grade");
// var total = Number(q12p1) + Number(q12p2) + Number(q12p3) + Number(q12p4) + Number(q12p5);
// console.log("Total is : " + total);
// console.log("Average is : " + Number(total)/5 );
// console.log("Percentage is : " + Number(total)/5 + " %"); 

////Q13
// do{
//     var q13 = prompt("Please Enter Q13 number between 1 and 12");
// }
// while( isNaN(Number(q13)) || q13<1 || q13>12 );
// var intq13=Number(q13);
// if( intq13 == 2){
//     console.log("28 days");
// }else if( intq13 == 4 || intq13 == 6 || intq13 == 9 || intq13 == 11){
//     console.log("30 days");
// }else{
//     console.log("31 days");
// }

////Q14
// var q14p1 = prompt("Please Enter Q14 Physics Grade");
// var q14p2 = prompt("Please Enter Q14 Chemistry Grade");
// var q14p3 = prompt("Please Enter Q14 Biology Grade");
// var q14p4 = prompt("Please Enter Q14 Mathematics  Grade");
// var q14p5 = prompt("Please Enter Q14 Computer Grade");
// var total = Number(q14p1) + Number(q14p2) + Number(q14p3) + Number(q14p4) + Number(q14p5);
// var percentage=Number(total)/5;
// console.log("Percentage is : " + Number(percentage) + " %");
// if( percentage>=90){
//     console.log("Your Grade is : A");
// }else if(percentage>=80){
//     console.log("Your Grade is : B");
// }else if(percentage>=70){
//     console.log("Your Grade is : C");
// }else if(percentage>=60){
//     console.log("Your Grade is : D");
// }else{
//     console.log("Your Grade is : F");
// }

////Q15
// var operation = prompt("Enter Q15 number between 1 and 6");
// switch( Number(operation) ){
//     case 1:
//         do{
//             var q13 = prompt("Please Enter Q13 number between 1 and 12");
//         }
//         while( isNaN(Number(q13)) || q13<1 || q13>12 );
//         var intq13=Number(q13);
//         if( intq13 == 2){
//             console.log("28 days");
//         }else if( intq13 == 4 || intq13 == 6 || intq13 == 9 || intq13 == 11){
//             console.log("30 days");
//         }else{
//             console.log("31 days");
//         }
//         break;
//     case 2:
//         do{
//             var q15 = prompt("Please Enter Q15 character");
//         }
//         while( !isNaN(Number(q15)));
//         if( q15=="a" || q15=="e" || q15=="i" || q15=="o" || q15=="u"){
//             console.log(q15 + " Is Vowel");
//         }else{
//             console.log(q15 + " Is Consonant");
//         }
//         break;
//     case 3:
//         do{
//             var q15p1 = prompt("Please Enter Q15 First number");
//         }
//         while( isNaN(Number(q15p1)));
//         do{
//             var q15p2 = prompt("Please Enter Q15 Second number");
//         }
//         while( isNaN(Number(q15p2)));
//         if( Number(q15p2) > Number(q15p1) ){
//             console.log(q15p2);
//         }else{
//             console.log(q15p1);
//         }
//         break;
//     case 4:
//         do{
//             var q6 = prompt("Please Enter Q6 number");
//         }
//         while( isNaN(Number(q6)));
//         if( Number(q6) % 2 ==0){
//             console.log(q6 + " Is Even");
//         }else{
//             console.log(q6 + " Is Odd");
//         }
//         break;
//     case 5:
//         do{
//             var q4 = prompt("Please Enter Q4 number");
//         }
//         while( isNaN(Number(q4)));
//         if(Number(q4)<0){
//             console.log("Negative Number");
//         }else if(Number(q4)==0){
//             console.log("Zero");
//         }else{
//             console.log("Positive Number");
//         }
//         break;
//     //start case 6
//     case 6:
//         var q15op = prompt("Please Enter a mathematical operation between +,-,*,/");
//         var q15p1 = prompt("Please enter q16 first number");
//         var q15p2 = prompt("Please enter q16 second number");
//         switch(q15op){
//             case '+': 
//                 console.log(Number(q15p1) + Number(q15p2));
//                 break;
//             case '-':
//                 console.log(Number(q15p1) - Number(q15p2));
//                 break;
//             case '*':
//                 console.log( q15p1 * q15p2);
//                 break;
//             case '/':
//                 console.log( q15p1 / q15p2);
//                 break;
//             default: 
//                 console.log("Invalid mathematical operation");
//         }
//         break;
//     //end case 6
//     default: 
//         console.log("Invalid Number");
// }


////Q16
// for(var i=1; i<11 ; i++){
//     console.log(i);
// }

////Q17
// var total=0;
// for(var i=1; i<11 ; i++){
//     total +=i;
// }
// console.log("total is : " + total);

////Q18
// for(var i=2 ; i<20 ; i++){
//     if(i%2==0){
//         console.log(i);
//     }
// }

////Q19
// var q19=prompt("Please enter Q19 Number");
// var result=1;
// for(var i=1; i<=q19 ; i++){
//     result*=i;
// }
// console.log(result);

////Q20
// var q20 = prompt("Enter Q20 string");
// var result = "";
// var size=q20.length;
// for (var i = size-1; i>=0 ; i--){
//     result += q20[i];
// }
// console.log("Reversed String is : " + result);

////Q21
// var q21 = prompt("Enter Q21 string");
// var size=q21.length;
// for (var i = 0 ; i<size ; i++){
//     console.log(q21[i]);
// }

////Q22
// var arr=[ 10 , 7 , 12 , 1 , 0 , 5];
// var max=-100000;
// for (var i=0; i < arr.length ; i++){
//     if(max<arr[i]){
//         max=arr[i];
//     }
// }
// console.log("max is : " + max);

////Q23
// do{
//     var q9 = prompt("Please Enter Q9 number");
// }
// while( isNaN(Number(q9)) );
// for (var i=1 ; i<11; i++){
//     console.log( String(i) + " * " + String(q9) + " = " + i*q9);
// }

////Q24
// var str = prompt("Please Enter A string");
// var counter=0;
// for (var i=0; i< str.length ; i++){
//     if( str[i]=="a" || str[i]=="e" || str[i]=="i" || str[i]=="o" || str[i]=="u"){
//         counter++;
//     }
// }
// console.log("Number of vowels is : " + counter);

////Q25
var number=prompt("Enter a number");
var flag=1;
if( number==1 || number==0 ){
    console.log("Non-Prime");
}
else{
    for(var i=2; i*i<=number ; i++){
        if( number%i == 0){
            console.log("Non-Prime");
            flag=0;
            break;
        }
    }
    if(flag==1){
        console.log("Prime");
    }
}