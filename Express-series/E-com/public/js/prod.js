// Use the Express API on port 3000, even when the page is opened
// via Live Server (port 5500) instead of Express (port 3000).
const API_BASE_URL = window.location.port === "3000" ? "" : "http://localhost:3000";

const displayProduct = (data) => {
  const listArea = document.querySelector(".list-area");

  const li = document.createElement("li");

  li.innerHTML = `
        ${data.product.name}
    `;

  listArea.appendChild(li);
};

const handleOnSubmit = (event) => {
  event.preventDefault();

  const productName = event.target.productName.value.trim();

  if (!productName) {
    alert("Please enter a product name");
    return;
  }

  const obj = {
    name: productName,
  };

  fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayProduct(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
