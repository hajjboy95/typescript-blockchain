import { SHA256} from "crypto-js";
import * as CryptoJS from "crypto-js";

export class Block {
    index: number
    timestamp: string
    data: any
    previousHash: string
    hash: string = ""

    constructor(index: number, timestamp: string, data: {amount: number} | string, previousHash: string = "") {
        this.index = index;
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
    }
    calculateHash(): string {
        // if (this.index == 0) { return "" }
        let toHash = `${this.index}${this.timestamp}${this.data}${this.previousHash}`
        return SHA256(toHash).toString(CryptoJS.enc.Base64);
    }
}



export class Blockchain {
    chain: Block[];

    constructor() {
        this.chain = [this.createGeneisBlock()]
    }

    createGeneisBlock(): Block {
        const block = new Block(0, "13/2/2019", "Genenis Block", "0");
        block.hash = block.calculateHash()
        return block;
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock: Block) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash();
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

    demochain.addBlock(new Block(1,"10/02/19", {
        amount: 10
    } ,null))
    
    
    demochain.addBlock(new Block(2,"11/02/19", {
        amount: 20
    }, null))

    demochain.addBlock(new Block(3,"11/02/19", {
        amount: 350
    }, null))

    
    console.log(JSON.stringify(demochain, null, 4))
    console.log(demochain.isChainValid())
}