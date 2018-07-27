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

let TxDecoder = module.exports = function(rawtx, network, type) {
  this.network = network;
  if(type === 'transaction') {
    this.tx = bitcoin.Transaction.fromHex(rawtx);
    this.format = decodeFormat(this.tx);
    this.inputs = decodeInput(this.tx);
    this.outputs = decodeOutput(this.tx, this.network);
  } else if (type === 'block') {
    this.block = bitcoin.Block.fromHex(rawtx);
  }
}

TxDecoder.prototype.toObject = function() {
  return {
    format: this.format,
    inputs: this.inputs,
    outputs: this.outputs,
  }
}

TxDecoder.prototype.decode = function() {
  let result = {}
  let self = this;
  Object.keys(self.format).forEach(function(key) {
    result[key] = self.format[key]
  })
  result.outputs = self.outputs
  return result;
}
