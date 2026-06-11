// Write your code below:

// For Fruit World 
const header = document.getElementById("header")
header.style.backgroundColor = "green"
header.style.borderBottom = "2px solid orange" 

const heading = document.getElementById("main-heading")
heading.innerText = "Fruit World"
heading.style.color = "orange"


const basket = document.getElementById("basket-heading")
basket.style.color = "green"

const thanks = document.getElementById("thanks")
let paragraph = document.createElement("p")
paragraph.innerText = "Please visit us again"

thanks.appendChild(paragraph)
