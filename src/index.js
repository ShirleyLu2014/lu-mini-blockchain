const vorpal = require("vorpal")();
const formatLog = require("./utils/formatLog");
const Blockchain = require("./blockchain");
const blockchain = new Blockchain();
vorpal.command("mine <address>", "挖矿").action(function (args, callback) {
  const { address } = args;
  const newBlock = blockchain.mine(address);
  if (newBlock) {
    this.log(newBlock);
    formatLog(newBlock);
  }
  callback();
});

vorpal.command("chain", "查看区块链").action(function (args, callback) {
  this.log(blockchain.blockchain);
  formatLog(blockchain.blockchain);
  callback();
});

vorpal
  .command("trans <from> <to> <amount>", "交易转账")
  .action(function (args, callback) {
    const { from, to, amount } = args;
    const transfer = blockchain.transfer(from, to, amount);
    if (transfer) {
      formatLog(transfer);
    }
    callback();
  });

vorpal
  .command("detail <index>", "区块详情查询")
  .action(function (args, callback) {
    const { index } = args;
    const blockDetail = blockchain.blockchain[index];
    formatLog(blockDetail);
    this.log(blockDetail);
    callback();
  });

vorpal
  .command("blance <address>", "区块余额查询")
  .action(function (args, callback) {
    const { address } = args;
    const blance = blockchain.blance(address);
    if (blance) {
      formatLog(address, blance);
      this.log(address, blance);
    }

    callback();
  });
vorpal.help();
vorpal.delimiter("lu-mini-chain =>").show();
