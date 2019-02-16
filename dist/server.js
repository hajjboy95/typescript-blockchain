"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./index");
// const t34 = require('./test');
const app = express();
app.get("/", (req, res) => {
    res.send("Hello World");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // awaitExmaple()
    index_1.createBlockchain();
    // t34
});
//# sourceMappingURL=server.js.map