const http = require('http');
const fs = require('fs');

const server = http.createServer((req , res) => {
    let url = req.url;
    let method = req.method;

    if(url === '/'){

        fs.readFile("message.txt", "utf8", (err, value) => {

        if (err) {
            value = "No messages yet";
        }

        res.setHeader("Content-Type", "text/html");

        res.end(`
            <h1>${value}</h1>

            <form action="/submit" method="POST">
                <input type="text" name="message" placeholder="Enter your message" required>
                <button>Send</button>
            </form>
        `);

    });

    } else if (req.url === "/submit" && req.method === "POST") {
        let values = []

        req.on('data' , (chunk) =>{
            values.push(chunk);
        })

        req.on('end' , () => {
            let parseBody = Buffer.concat(values).toString();
            
            fs.writeFile('message.txt' , parseBody.split('=')[1] , (err) => {
                if(err){
                    console.log(err);
                    res.end('Error writing to file');
                }
                res.statusCode = 302;
                res.setHeader('Location', '/'); 
                res.end();
            })
        })
    }
})

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})