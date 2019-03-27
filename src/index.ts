import { SHA256} from "crypto-js";
import * as CryptoJS from "crypto-js";

class Transaction {
    timestamp: number
    payerAddr: string
    payeeAddr: string
    amount: number

    constructor(timestamp: number, payerAddr: string, payeeAddr: string, amount: number) {
        this.timestamp = timestamp
        this.payerAddr = payerAddr
        this.payeeAddr = payeeAddr
        this.amount = amount
    }
}

export class Block {
    index: number
    timestamp: number
    txns: Transaction[]
    previousHash: string
    hash: string
    nonce: number

    constructor(timestamp: number, txns: Transaction[], previousHash: string = "") {
        this.timestamp = timestamp
        this.txns = txns
        this.previousHash = previousHash
        this.nonce = 0
        this.hash = this.calculateHash()
    }
    
    calculateHash(): string {
        let toHash = `${this.index}${this.timestamp}${this.txns}${this.previousHash}${this.nonce}`
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
    unminedTxns: Transaction[]
    miningReward: number
    registeredAddresses: string[]

    constructor() {
        this.chain = []
        this.difficulty = 2
        this.unminedTxns = []
        this.miningReward = 50
        this.registeredAddresses = [
            "wallet-alice",
            'wallet-bob',
            'wallet-charlie',
            'wallet-miner-1'
        ]
        this.createGeneisBlock()
        this.airdropCoins(100);
    }

    createGeneisBlock(): Block {
        let txn = new Transaction(Date.now(), "mint", "genisis", 0)
        const block = new Block( Date.now(), [txn], "0");
        this.chain.push(block)
        return block;
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length -1];
    }

    airdropCoins(coins: number) {
        for (const addr of this.registeredAddresses) {
            let txn = new Transaction(Date.now(), "mint", addr, coins)
            this.unminedTxns.push(txn)
        }

        this.mineCurrentBlock("wallet-miner-1");
    }

    mineCurrentBlock(minerAddr: string) {
        let validatedTxns: Transaction[] = []

        for (const txn of this.unminedTxns) {
            if (txn.payerAddr === "mint" || this.validateTransaction(txn)) {
                validatedTxns.push(txn);
            }
        }

        let block = new Block(Date.now(), validatedTxns, this.getLatestBlock().hash)
        block.mineBlock(this.difficulty)
        this.chain.push(block);
        this.unminedTxns = [
            new Transaction(Date.now(), "mint", minerAddr, this.miningReward)
        ];    
    }

    validateTransaction(txn: Transaction): boolean {
        let payerAddr = txn.payerAddr
        let balance = this.getAddressBalance(payerAddr);

        if (balance >= txn.amount) {
            return true
        } else {
            return false
        }
    }

    createTransaction(txn: Transaction) {
        this.unminedTxns.push(txn)
    }

    getAddressBalance(addr: string): number {
        let balance = 0
        for(const block of this.chain) {
            for (const txn of block.txns) {
                if (txn.payerAddr === addr) {
                    balance -= txn.amount
                }

                if (txn.payeeAddr === addr) {
                    balance += txn.amount
                }
            }
        }
        return balance
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

    console.log(`First Block --------`)

    let demoCoin = new Blockchain()
    demoCoin.createTransaction(
        new Transaction(Date.now(), "wallet-alice", "wallet-bob", 1000)
    )


    demoCoin.createTransaction(
        new Transaction(Date.now(), "wallet-bob", "wallet-alice", 25)
    )
    
    console.log(`Mining A block`)

    demoCoin.mineCurrentBlock('wallet-miner-1');

    
    console.log(`Balance Alice: ${demoCoin.getAddressBalance('wallet-alice')}`)
    console.log(`Balance Bob: ${demoCoin.getAddressBalance('wallet-bob')}`)
    console.log(`Balance miner: ${demoCoin.getAddressBalance('wallet-miner-1')}`)


    /// SECOND BLOCK 

    console.log(`Second Block --------`)

    demoCoin.createTransaction(
        new Transaction(Date.now(), "wallet-alice", "wallet-bob", 50)
    )


    demoCoin.createTransaction(
        new Transaction(Date.now(), "wallet-bob", "wallet-alice", 25)
    )
    
    console.log(`Mining A block`)

    demoCoin.mineCurrentBlock('wallet-miner-1');

    
    console.log(`Balance Alice: ${demoCoin.getAddressBalance('wallet-alice')}`)
    console.log(`Balance Bob: ${demoCoin.getAddressBalance('wallet-bob')}`)
    console.log(`Balance miner: ${demoCoin.getAddressBalance('wallet-miner-1')}`)



    console.log(`\nIs Chain Valid ? = ${demoCoin.isChainValid()}`)

    
} 