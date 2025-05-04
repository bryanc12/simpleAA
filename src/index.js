const express = require("express");
const app = express();

const cookierParsers = require("cookie-parser");

const routes = require("./routes/index.route.js");

app.use(cookierParsers());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(5000, () => {
    console.log("Server listening on port 5000");
});
