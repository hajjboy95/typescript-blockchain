import * as express from "express";
import { createBlockchain } from "./index";
import { SHA256 } from "crypto-js";
import * as CryptoJS from "crypto-js";
import {awaitExmaple, promiseExmaples} from "./promiseExamples";

const t34 = require('./test');

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



console.log("Hello Amina");

let ds = "Amina"
let as = 1
let fds = new Date().toLocaleString()
let fsg = null

let multExample: number

if (as > 2) {
    multExample = as * 25
} else if( as == 4) {
    multExample = as * 24
} else {
    multExample = 10
}


console.log(multExample.toExponential())