window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get(API_URL);

        response.data.forEach((item) => {
            displayItem(item);
        });
    } catch (err) {
        console.error(err);
    }
});

const API_URL = "https://crudcrud.com/api/09b0bfff5f334d1898e0a80a6c993ef9/items";

async function handleListItem(event) {
    event.preventDefault();

    const item = document.getElementById("item").value.trim();
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value.trim();

    if (!item || !price) {
        alert("Please fill all fields");
        return;
    }

    const itemObj = {
        item,
        category,
        price
    };

    try {
        const response = await axios.post(API_URL, itemObj);

        displayItem(response.data);

        document.getElementById("item").value = "";
        document.getElementById("price").value = "";
    } catch (err) {
        console.error(err);
    }
}

function displayItem(data) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span>${data.item} - ₹${data.price}</span>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
        deleteItem(data._id, li);
    });

    if (data.category === "Food") {
        document.getElementById("Food-items-list").appendChild(li);
    } else if (data.category === "Electronic") {
        document.getElementById("Electronic-items-list").appendChild(li);
    } else {
        document.getElementById("skin-care-list").appendChild(li);
    }
}

async function deleteItem(id, li) {
    try {
        await axios.delete(`${API_URL}/${id}`);
        li.remove();
    } catch (err) {
        console.error(err);
    }
}