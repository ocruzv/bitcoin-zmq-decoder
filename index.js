'use strict'
let bitcoin = require('bitcoinjs-lib');

let decodeFormat = function(tx) {
  let result = {
    txid: tx.getId(),
    version: tx.version,
    locktime: tx.locktime,
    size: tx.byteLength(),
    vsize: tx.virtualSize(),
  };
  return result;
}

let decodeInput = function(tx) {
  let result = tx.ins.map(function(input, n) {
    let vin = {
      txid: input.hash.reverse().toString('hex'),
      n: input.index,
      script: bitcoin.script.toASM(input.script),
      sequence: input.sequence,
    }
    return vin
  })
  return result
}

let decodeOutput = function(tx, network) {

  let format = function(out, n, network) {
    let vout = {
      satoshi: out.value,
      value: (1e-8 * out.value).toFixed(8),
      n: n,
      scriptPubKey: {
        asm: bitcoin.script.toASM(out.script),
        hex: out.script.toString('hex'),
        type: bitcoin.script.classifyOutput(out.script),
        addresses: [],
      },
    };
    switch (vout.scriptPubKey.type) {
      case 'pubkeyhash':
      case 'scripthash':
        vout.scriptPubKey.addresses.push(bitcoin.address.fromOutputScript(out.script, network));
        break;
      case 'pubkey': // There really is no address
        let pubKeyBuffer = bitcoin.script.pubKey.output.decode(out.script);
        vout.scriptPubKey.addresses.push(bitcoin.ECPair.fromPublicKeyBuffer(pubKeyBuffer, network).getAddress());
        break;
      case 'nulldata': // OP_RETURN
        break;
      default:
        break;
    }
    return vout
  }

  let result = tx.outs.map(function(out, n) {
    return format(out, n, network);
  })
  return result
}

module.exports = class BitcoinCashZMQDecoder {
  constructor(network = 'mainnet') {
    if(this.network === 'mainnet') {
      this.network = { 'pubKeyHash': 0x00, 'scriptHash': 0x05 };
    } else {
      this.network = { 'pubKeyHash': 0x6F, 'scriptHash': 0xC4 };
    }
  }

  decodeTransaction(hex) {
    let tx = bitcoin.Transaction.fromHex(hex);
    let format = decodeFormat(tx);
    let inputs = decodeInput(tx);
    let outputs = decodeOutput(tx, this.network);
    return {
      format: format,
      inputs: inputs,
      outputs: outputs,
    }
  }

  decodeBlock(hex) {
    let block = bitcoin.Block.fromHex(hex);
    let totalOuts = 0;
    block.transactions.forEach((tx, indx) => {

      tx.outs.forEach((output) => {
        totalOuts += output.value;
      });
    });

    return {
      "nTx": block.transactions.length,
      "totalBCHSent": totalOuts,
      "reward": 1250000000,
      "prevHash": block.prevHash.toString('hex'),
      "id": block.getHash().toString('hex'),
      "hash": block.getHash().toString('hex').match(/.{2}/g).reverse().join(""),
      "merkleRoot": block.merkleRoot.toString('hex'),
      "version": block.version,
      "time": block.timestamp,
      "bits": block.bits,
      "nonce": block.nonce
    };
  }
}
