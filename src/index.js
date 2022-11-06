const vorpal = require('vorpal')();
const formatLog = require("./utils/formatLog")
const Blockchain = require("./blockchain");
const blockchain = new Blockchain();
vorpal
  .command('mine', '挖矿')
  .action(function(args, callback) {
    const newBlock = blockchain.mine();
    if(newBlock) {
        this.log(newBlock);
        formatLog(newBlock);
    }
    callback();
  });

vorpal
.command('chain', '查看区块链')
.action(function(args, callback) {
   this.log(blockchain.blockchain);
   formatLog(blockchain.blockchain);
   callback();
});
vorpal.help();
vorpal
  .delimiter('lu-mini-chain =>')
  .show();