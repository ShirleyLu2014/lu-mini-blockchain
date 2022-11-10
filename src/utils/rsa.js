// 非对称加密
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const key = ec.genKeyPair();
const res = {
  prv: key.getPrivate("hex").toString(),
  pub: key.getPublic("hex").toString(),
};
console.log(res);
