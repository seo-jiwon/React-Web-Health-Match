const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const test = require("./Router/test");
const users = require("./Router/users");
const post = require("./Router/post");
const user_match = require("./Router/user_match");
const t_match = require("./Router/t_match");
const u_match = require("./Router/u_match");
const select_t = require("./Router/select_t");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/hi", test);
app.use("/users", users);
app.use("/post", post);
app.use("/user_match", user_match);
app.use("/t_match", t_match);
app.use("/u_match", u_match);
app.use("/select_t", select_t);

const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});