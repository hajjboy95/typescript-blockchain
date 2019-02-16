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
    awaitExmaple()
    // createBlockchain()
    // t34
})


// const promiseAndAwaitExmaple = () => {
//     console.log("Hi")

//     function waitFor2Seconds(): Promise<string> {
//         return new Promise<string>((resolve, reject) => {
//             setTimeout(() => {
//                 resolve("Hello There");
//             }, 1500);
//         })
//     }

//     function performNetworkTast(): Promise<any> {
//         return new Promise((res, rej) => {
//             let url = "www.google.com"
//             let random = Math.floor(Math.random() * 10) % 2
//             console.log(random);
//             setTimeout(() => {
//                 if (random === 0) {
//                     res("random === 0")
//                 } else if (random === 1) {
//                     rej("random === 1")
//                 }
//             }, 240)

//         })
//     }

//     let executeNetworkTasks = async function() {
//         console.log("ASYNC FUNCTOIN")
//         let helloThere = await waitFor2Seconds();
//         console.log(helloThere);
//         let randomNetworkTest = await performNetworkTast()
//         console.log(randomNetworkTest);
        
//     }

//     executeNetworkTasks()

//     // performNetworkTast()
//     //     .then(function(task) {
//     //         console.log("task " + task);
//     //     })
//     //     .catch(function(e) {
//     //         console.log(e)
//     //     })


//     // let promise = waitFor2Seconds()
//     //     .then(function (a) {
//     //         console.log(a);
//     //         return new Promise((resolve) => resolve("exmaple"))
//     //     })
//     //     .then(function (b) {
//     //         console.log(b);
//     //     })
//     //     .catch(function (e) {
//     //         console.log(e);
//     //     })
// }
