const express = require('express');
const homeRouter = require('./routes/home.route');
const studentsRouter = require('./routes/students.route');
const coursesRouter = require('./routes/course.route');

const app = express();
app.use("/", homeRouter);
app.use("/", studentsRouter);
app.use("/" , coursesRouter);

app.use("/*splat", (req, res) => {
    res.status(404).send("Page not found");
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

