import { SHA256} from "crypto-js";
import * as CryptoJS from "crypto-js";

export class Block {
    index: number
    timestamp: string
    data: any
    previousHash: string
    hash: string
    nonce: number

    constructor(index: number, timestamp: string, data: {amount: number} | string, previousHash: string = "") {
        this.index = index;
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.nonce = 0
        this.hash = this.calculateHash()
    }
    calculateHash(): string {
        let toHash = `${this.index}${this.timestamp}${this.data}${this.previousHash}${this.nonce}`
        return SHA256(toHash).toString(CryptoJS.enc.Base64);
    }

    mineBlock(difficulty: number) {
        while (this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash();
        }    

        console.log(`Block Successfully hashed ${this.hash}`);
    }
}



export class Blockchain {
    chain: Block[];
    difficulty: number;
    
    constructor() {
        this.chain = [this.createGeneisBlock()]
        this.difficulty = 2
    }

    createGeneisBlock(): Block {
        const block = new Block(0, "13/2/2019", "Genenis Block", "0");
        return block;
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock: Block) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock);
    } 

    isChainValid(): boolean {
        for (var i=0; i< this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (previousBlock !== undefined && currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }
        return true
    }
}

export const createBlockchain = () => {
    let demochain = new Blockchain()

    console.log(`Starting to mine new block .... `)

    demochain.addBlock(new Block(1,"10/02/19", {
        amount: 10
    } ,null))
    
    console.log(`Starting to mine new block .... `)

    demochain.addBlock(new Block(2,"11/02/19", {
        amount: 20
    }, null))

    console.log(`Starting to mine new block .... `)

    demochain.addBlock(new Block(3,"11/02/19", {
        amount: 350
    }, null))

    
    console.log(JSON.stringify(demochain, null, 4))
    console.log(demochain.isChainValid())
}