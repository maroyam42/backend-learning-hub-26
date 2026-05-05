/*
 Khaled ordered pizza and chaos followed:
  - Prices got converted from strings like it's magic
  - Toppings were chosen with questionable decisions
  - Deliveries were attempted across multiple stops
  - And somehow, Ahmed is always first (as he should be)

  This file documents the emotional journey of:
  hunger, coercion, arrays, loops, and poor life choices.
*/
let StudentName="Mariam";
const pizzaFlavor="pepperoni";
let hungerLevel = 10;
let isPizzaHot = true 
let deliveryAddress = "cairo"
console.log(typeof(hungerLevel));
console.log(typeof(isPizzaHot));
console.log(typeof(deliveryAddress));
let orderTotal="85";
let pizzacost=Number(orderTotal);
let tip=15;
let bouns=Number(true);
let finalTotal=pizzacost+tip+bouns;
console.log(finalTotal);
let totalBill=pizzacost+tip;
let minutesWaiting=45+45;
let isEven=minutesWaiting%2===0;
console.log(2+3*4-1);//13
console.log((2+3)*(4-1));//15
if(isPizzaHot==true&&hungerLevel>7){
    console.log("OPEN THE DOOR AND SPRINT");
}else if(isPizzaHot==true&&hungerLevel>=5&&hungerLevel<=7){
    console.log("Walk, you have dignity");
}else{
    console.log("Order sushi next time");
}
// // Expression
// let hungerLevel = 7;
// let isHungry = hungerLevel > 5; // expression → produces a value
// // Statement
// if (hungerLevel > 5) {  // statement → performs an action
//     console.log("I'm hungry, let's eat!");
// }
console.log(pizzaFlavor.toUpperCase());
console.log(pizzaFlavor.length);
console.log(pizzaFlavor.toUpperCase());
console.log(pizzaFlavor.includes("pepper"));
console.log(`student name is : ${StudentName},pizza flavor is:${pizzaFlavor},total bill is ${totalBill} and minutes wait ${minutesWaiting} `);

let toppings = ["cheese", "olives", "mushrooms"];
let order = {
    customer: "Mariam",
    flavor: "pepperoni",
    isDelivered: false
};
order.isDelivered = true;
//single comment
function calculateTotal(price, tip) {
    return price + tip;
}
const calculateTotalArrow = (price, tip) => {
    return price + tip;
};
let result1 = calculateTotal(100, 20);
let result2 = calculateTotalArrow(100, 20);
console.log("Regular function:", result1);
console.log("Arrow function:", result2);
console.log("Same result?", result1 === result2);

let stops = ["Ahmed", "Sara", "Mona", "Tarek"];

for (let i = 0; i < stops.length; i++) {
    
    if (stops[i] === "Ahmed") {
        console.log("Delivering to Ahmed");
        break;
    }
    console.log("Delivering to " + stops[i] + "...");
}
