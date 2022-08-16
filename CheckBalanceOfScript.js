"use strict";

var web3_Api = "https://mainnet.infura.io/v3/e6dc59c671784525b8e292e12f66e068";

// var Web3 = require("web3");

var fs = require("fs");
var parse = require("csv-parse");

("use strict");

(async () => {
  //   fs.createReadStream("./jalal_sheet.csv")
  //     .pipe(parse({ delimiter: ",", from_line: 2 }))
  //     .on("data", function (row) {
  //       console.log(row);
  //     });

  //   const data = [];

  //   fs.createReadStream("./jalal_sheet.csv")
  //     .pipe(csv.parse({ headers: true }))
  //     .on("error", (error) => console.error(error))
  //     .on("data", (row) => data.push(row))
  //     .on("end", () => console.log(data));

  //   var datax = await readFile("./jalal.xlsx");
  //   console.log(data);

  var csvData = [];
  fs.createReadStream(req.file.path)
    .pipe(parse({ delimiter: ":" }))
    .on("data", function (csvrow) {
      console.log(csvrow);
      //do something with csvrow
      csvData.push(csvrow);
    })
    .on("end", function () {
      //do something with csvData
      console.log(csvData);
    });

  const web3 = new Web3(web3_Api);
  var numberOfAccounts = 5;

  try {
    for (let i = 0; i < numberOfAccounts; i++) {
      var accountBalance = await web3.eth.getBalance(
        "0xf0a9b8b87F0545E2cF2D2e1301D6d6F9a0542487"
      );

      var accountBalanceInEth = web3.utils.fromWei(accountBalance);

      if (accountBalanceInEth > 0.004) {
        console.log("I am an verified account");
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

function toEthUnit(wei) {
  var num = Web3.utils.fromWei(wei);
  var value = parseFloat(num).toFixed(6);
  return value;
}

async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function readCSV(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
