"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        // if (this.index == 0) { return "" }
        let toHash = `${this.index}${this.timestamp}${this.data}${this.previousHash}${this.nonce}`;
        return crypto_js_1.SHA256(toHash).toString(CryptoJS.enc.Base64);
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block Successfully hashed ${this.hash}`);
    }
}
exports.Block = Block;
class Blockchain {
    constructor() {
        this.chain = [this.createGeneisBlock()];
    }
    createGeneisBlock() {
        const block = new Block(0, "13/2/2019", "Genenis Block", "0");
        return block;
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (var i = 0; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];
            console.log(`currentBlock.hash = ${currentBlock.hash}`);
            console.log(`currentBlock.calculateHash() = ${currentBlock.calculateHash()}`);
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (previousBlock !== undefined && currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
exports.Blockchain = Blockchain;
exports.createBlockchain = () => {
    let demochain = new Blockchain();
    demochain.addBlock(new Block(1, "10/02/19", {
        amount: 10
    }, null));
    demochain.addBlock(new Block(2, "11/02/19", {
        amount: 20
    }, null));
    demochain.addBlock(new Block(3, "11/02/19", {
        amount: 350
    }, null));
    console.log(JSON.stringify(demochain, null, 4));
    console.log(demochain.isChainValid());
};
//# sourceMappingURL=index.js.map