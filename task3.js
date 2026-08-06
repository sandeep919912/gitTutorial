// // Write your code below:
// const listItems = document.getElementsByTagName("li")

// listItems[4].style.color = "red"

// for (let i = 0; i < listItems.length; i++){
//     listItems[i].style.fontStyle = "italic"
// }

window.prototype.name = "sahil"

const obj = {
  name: "JS",

  getName: () => {
     console.log(this.name)
  },
};

obj.getName();
