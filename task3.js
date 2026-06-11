// Write your code below:
const listItems = document.getElementsByTagName("li")

listItems[4].style.color = "red"

for (let i = 0; i < listItems.length; i++){
    listItems[i].style.fontStyle = "italic"
}