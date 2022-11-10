const Table = require("cli-table");
const formatLog = (data) => {
  if (!Array.isArray(data)) {
    data = [data];
  }
  const first = data[0];
  const head = Object.keys(first);
  const table = new Table({
    head,
    colwidths: new Array(head.length).fill(10),
  });
  const res = data.map((v) => {
    return head.map((h) => JSON.stringify(v[h], null, 1));
  });
  table.push(...res);
  console.log(table.toString());
};
module.exports = formatLog;
