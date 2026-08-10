const handleOnSubmit = (event) => {
    event.preventDefault();

    const productName = event.target.productName.value;

    const obj = {
        name: productName
    };

    fetch("/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
};