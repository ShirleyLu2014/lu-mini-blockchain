const crypto = require("crypto")
// 创世区块
const initBlock = {
    index: 0,
    data: 'lu mini blockchain',
    prevHash: '0',
    timestamp: 1667720669290,
    nonce: 120625,
    hash: '00006fcf79ab670055008f6ad41e001ed4e94a413822b0e40a5f2d265d0f0461'
  };
class Blockchain {
    constructor() {
        this.blockchain = [ initBlock ]
        this.data = []
        this.difficulty = 4
        // const hash = this.computeHash(0, '0', new Date().getTime(), "hello", 1)
        // console.log(hash)
        // this.mine()
    }
    // 获取最新的区块
    getLastBlock() {
        return this.blockchain[this.blockchain.length - 1]
    }
    // 挖矿函数
    mine() {
        // 1.生成新区块,一页新的记账加入了区块链
        // 2.不停计算哈希，直到符合难度条件，获得记账权，新增区块
        const newBlock = this.generateNewBlock();
        // 如果新区块合法 并且区块链合法 则新增下一个
        if(this.isValidBlock(newBlock) && this.isValidChain()) {
            this.blockchain.push(newBlock);
            return newBlock;
        } else {
            console.log("error 不合法的区块")
        }
        // console.log("this.blockchain", this.blockchain);
    }
    // 生成新区块
    generateNewBlock() {
        let nonce = 0; // 随机数
        const data = this.data;
        const prevHash = this.getLastBlock().hash;
        const index = this.blockchain.length; // 区块索引
        const timestamp = new Date().getTime(); // 时间戳
        let hash = this.computeHash(index, prevHash, timestamp, data, nonce)
        while(hash.slice(0, this.difficulty) !== "0".repeat(this.difficulty)) {
            ++nonce
            hash = this.computeHash(index, prevHash, timestamp, data, nonce)
            // console.log(nonce, hash)
        }
       return {
            index,
            data,
            prevHash,
            timestamp,
            nonce,
            hash
        }
    }
    // 计算新区块的hash值
    computeHashForBlock({ index, prevHash, timestamp, data, nonce }) {
        return this.computeHash(index, prevHash, timestamp, data, nonce);
    }
    // 计算哈希
    computeHash(index, prevHash, timestamp, data, nonce) {
        return crypto
                 .createHash("sha256")
                 .update(index + prevHash + timestamp + data + nonce)
                 .digest("hex")
    }
    // 校验区块
    isValidBlock(newBlock, lastBlock = this.getLastBlock()) {
        // const lastBlock = this.getLastBlock();
        // 1.校验区块的index是否等于最新区块的index + 1
        // 2.区块的时间戳大于最新区块
        // 3.最新区块的prevHash是否等于最新区块的hash
        // 4.区块的hash是否服务难度要求
        // 5.新区块的hash是否计算正确
        if(newBlock.index !== lastBlock.index + 1) {
            return false;
        } else if(newBlock.timestamp <= lastBlock.timestamp) {
            return false;
        } else if(newBlock.prevHash !== lastBlock.hash) {
            return false;
        } else if(newBlock.hash.slice(0, this.difficulty) !== "0".repeat(this.difficulty)) {
            return false;
        } else if(newBlock.hash !== this.computeHashForBlock(newBlock)) {
            return false;
        }
        return true;
    }
    // 校验区块链
    isValidChain(chain = this.blockchain) {
        // 校验除创始区块以外的区块是否合法
        for(let i = chain.length - 1; i >= 1; i--){
            if(!this.isValidBlock(chain[i], chain[i - 1])) {
                return false
            }
        }
        if(JSON.stringify(chain[0]) !== JSON.stringify(initBlock)) {
            return false;
        }
        return true;
    }
}
// const blockchain = new Blockchain()
// blockchain.mine();
// blockchain.mine();
// blockchain.blockchain[2].hash = 11222
// blockchain.mine();
// console.log(blockchain.blockchain)
module.exports = Blockchain;