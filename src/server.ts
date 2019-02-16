import * as express from "express";
import { createBlockchain } from "./index";
import { SHA256 } from "crypto-js";
import * as CryptoJS from "crypto-js";
import {awaitExmaple, promiseExmaples} from "./promiseExamples";

// const t34 = require('./test');

const app = express();
app.get("/", (req, res) => {
    res.send("Hello World")
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // awaitExmaple()
    createBlockchain()
    // t34
})