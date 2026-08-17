const http = require("http");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const BASE = "http://localhost:3000";
let failures = 0;
const results = [];

function check(name, cond, extra) {
  results.push(`${cond ? "PASS" : "FAIL"} - ${name}${extra ? " | " + extra : ""}`);
  if (!cond) failures++;
}

async function run() {
  // 1. GET /products from Express
  try {
    const r = await axios.get(`${BASE}/products`);
    check("GET /products (Express) returns 200", r.status === 200);
    check("HTML includes /public/js/prod.js script", r.data.includes("/public/js/prod.js"));
  } catch (e) { check("GET /products (Express)", false, e.message); }

  // 2. GET /public/js/prod.js from Express
  try {
    const r = await axios.get(`${BASE}/public/js/prod.js`);
    check("GET /public/js/prod.js (Express) returns 200", r.status === 200);
    check("served JS includes API_BASE_URL", r.data.includes("API_BASE_URL"));
    check("Content-Type is javascript", (r.headers["content-type"] || "").includes("javascript"));
  } catch (e) { check("GET /public/js/prod.js (Express)", false, e.message); }

  // 3. POST /products with Origin header (cross-origin from Live Server)
  try {
    const r = await axios.post(`${BASE}/products`, { name: "Laptop" }, {
      headers: { Origin: "http://127.0.0.1:5500", "Content-Type": "application/json" },
    });
    check("POST /products returns 201", r.status === 201);
    check("response has product.name = Laptop", r.data.product.name === "Laptop");
    check("CORS Allow-Origin header present", r.headers["access-control-allow-origin"] === "*");
  } catch (e) { check("POST /products", false, e.message); }

  // 4. OPTIONS preflight (what a browser sends before the cross-origin POST)
  try {
    const r = await axios.options(`${BASE}/products`, {
      headers: {
        Origin: "http://127.0.0.1:5500",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
      },
    });
    check("OPTIONS preflight returns 204", r.status === 204);
    check("preflight allows POST", (r.headers["access-control-allow-methods"] || "").includes("POST"));
  } catch (e) { check("OPTIONS preflight", false, e.message); }

  // 5. Simulate Live Server on port 5500 (serves project root like the VS Code extension)
  const staticServer = http.createServer((req, res) => {
    const f = path.join(process.cwd(), req.url.split("?")[0]);
    fs.readFile(f, (err, data) => {
      if (err) { res.writeHead(404); res.end("404"); }
      else {
        const ct = path.extname(f) === ".js" ? "application/javascript" : "text/html";
        res.writeHead(200, { "Content-Type": ct });
        res.end(data);
      }
    });
  });
  await new Promise((resolve) => staticServer.listen(5500, resolve));

  try {
    const r = await axios.get("http://127.0.0.1:5500/public/js/prod.js");
    check("GET /public/js/prod.js (Live Server 5500) returns 200", r.status === 200);
    check("Live Server serves JS with javascript content-type", (r.headers["content-type"] || "").includes("javascript"));
  } catch (e) { check("GET /public/js/prod.js (Live Server 5500)", false, e.message); }

  try {
    const r = await axios.get("http://127.0.0.1:5500/src/view/productsForm.html");
    check("GET productsForm.html (Live Server 5500) returns 200", r.status === 200);
    check("HTML includes /public/js/prod.js script", r.data.includes("/public/js/prod.js"));
  } catch (e) { check("GET productsForm.html (Live Server 5500)", false, e.message); }

  staticServer.close();

  console.log(results.join("\n"));
  console.log(`\n${failures === 0 ? "ALL TESTS PASSED" : failures + " TEST(S) FAILED"}`);
  process.exit(failures === 0 ? 0 : 1);
}

run();
