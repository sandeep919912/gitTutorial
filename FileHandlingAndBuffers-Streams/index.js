const http = require('http');

const server = http.createServer((req , res) => {
    let url = req.url;
    let method = req.method;

    if(url === '/'){

        res.setHeader('Content-Type', 'text/html');
        res.end(`<form action='/message' method='POST'>
                <input type='text' name='username' placeholder='Enter your username'>
                <button type='submit'>Login</button>
            </form>`)
    } else if (req.url === "/message" && req.method === "POST") {

        // Handle POST data here

        res.end("Message received!");
    }
})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})