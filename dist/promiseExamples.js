"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitExmaple = () => {
    console.log("awaitExmaple");
    function waitFor2Seconds() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello There");
            }, 1500);
        });
    }
    function performNetworkTast() {
        return new Promise((res, rej) => {
            let random = Math.floor(Math.random() * 10) % 2;
            setTimeout(() => {
                if (random === 0) {
                    res("random === 0");
                }
                else if (random === 1) {
                    rej("random === 1");
                }
            }, 240);
        });
    }
    let executeNetworkTasks = () => __awaiter(this, void 0, void 0, function* () {
        console.log("ASYNC FUNCTOIN executeNetworkTasks");
        let helloThere = yield waitFor2Seconds();
        console.log(helloThere);
        let randomNetworkTest = yield performNetworkTast();
        console.log(randomNetworkTest);
        console.log("ASYNC FUNCTOIN COMPLETE");
    });
    let executeNetworkTasksTry = () => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("ASYNC FUNCTOIN executeNetworkTasksTry");
            let helloThere = yield waitFor2Seconds();
            console.log(helloThere);
            let randomNetworkTest = yield performNetworkTast();
            console.log(randomNetworkTest);
        }
        catch (e) {
            console.log("ERRROR catch something", e);
        }
    });
    const execution = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield executeNetworkTasks();
            yield executeNetworkTasksTry();
        }
        catch (e) {
            console.log(`ERROR ${e}`);
        }
    });
    execution();
};
exports.promiseExmaples = () => {
    function waitFor2Seconds() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello There");
            }, 1500);
        });
    }
    function performNetworkTast() {
        return new Promise((res, rej) => {
            let url = "www.google.com";
            let random = Math.floor(Math.random() * 10) % 2;
            console.log(random);
            setTimeout(() => {
                if (random === 0) {
                    res("random === 0");
                }
                else if (random === 1) {
                    rej("random === 1");
                }
            }, 240);
        });
    }
    performNetworkTast()
        .then(function (task) {
        console.log("task " + task);
    })
        .catch(function (e) {
        console.log(e);
    });
    let promise = waitFor2Seconds()
        .then(function (a) {
        console.log(a);
        return new Promise((resolve) => resolve("exmaple"));
    })
        .then(function (b) {
        console.log(b);
    })
        .catch(function (e) {
        console.log(e);
    });
};
//# sourceMappingURL=promiseExamples.js.map