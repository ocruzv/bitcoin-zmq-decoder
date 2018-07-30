# bitcoincash-zmq-decoder

## install

```
npm i bitcoincash-zmq-decoder --save
```

## usage

First `require` the lib and pass in the network to the constructor. Options are `"mainnet"` and `"testnet"`.

```
let BitcoinCashZMQDecoder = require('bitcoincash-zmq-decoder');
let bitcoincashZmqDecoder =  new BitcoinCashZMQDecoder("mainnet");
```

### Transactions

```js
let txd = bitcoincashZmqDecoder.decodeTransaction(message);
let blck = bitcoincashZmqDecoder.decodeBlock(message, network);

const rawtx = "0100000002bf4dc9f952d440947ae0ca48080ab634f98543586394c1cab6e4ff8845881bb3000000006b48304502210080289bb59861043f80261dc6722f4f17482f3864bc29aa71f19680f9e2fa0210022054553f135420db950c5a8d8182cb37d6f853ec23c25d6285c6248b2588e5d7a001210396bf7c2b1ffacf871fcdcb2ed52864b677d094d1aa98cf422a0d096d178add3effffffff4839ea8f8dc6fdc25d8f5fb5b171b762aa2a3aa0d3157fc8cc853443cae9e6d7000000006b483045022100a84530e8480169ab54c0dcbcceb2044faf52d8f3417a75feaaecad20eafcd3e602201aeb08bf44c3e01af15ca67b786efa63a13f7c8e8ad21f40909b3d36f23d6e33012102be9b1c757ce7d2a65edb25828a9242aad4b3cce74c1aa53fcc0e24db22140e43ffffffff0260ae0a00000000001976a9149f48a63a5103e77fc8eb39852bd651fd8a08bd1388ac40420f00000000001976a91488e8119ac2556cb9e7148726e8109872f7b409f188ac36331200";
const network = {'pubKeyHash': 0x00, 'scriptHash': 0x05}
const txd = new TxDecoder(rawtx, network)
console.log(JSON.stringify(txd.toObject(), null, 2))

// returns
{
  "format": {
    "txid": "6dd25f39f324c085a013a2f55fb55392c280ca82c17e602249ddb2c7b6f6aede",
    "version": 1,
    "locktime": 0,
    "size": 226,
    "vsize": 226
  },
  "inputs": [
    {
      "txid": "91dff995f6d5d64a106d6bcbbd8304fcba0c557871cba814779dde889a1a1ad6",
      "n": 0,
      "script": "3045022100963b819d81006f04e2650524b10ec9ee9ed0ab305e707f54704d23cc25191f420220560dd8f0c32104b34aa3ac3af888867506a1c623100d1ff298e462e40041e6b941 0350b30d68fc3a1cec60f295928426bb12d10e98da9bcc92f8d98ac327265c9d8c",
      "sequence": 4294967295
    }
  ],
  "outputs": [
    {
      "satoshi": 7631108298,
      "value": "76.31108298",
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 c83de633455d60f7618bea613ebe596952c57f1e OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914c83de633455d60f7618bea613ebe596952c57f1e88ac",
        "type": "pubkeyhash",
        "addresses": [
          "1KFnJCZNFZ863BmWSsyWRJ4ESwJViiZnoa"
        ]
      }
    },
    {
      "satoshi": 19011700,
      "value": "0.19011700",
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 463b57510fda4a831cae313150088c67f5893479 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914463b57510fda4a831cae313150088c67f589347988ac",
        "type": "pubkeyhash",
        "addresses": [
          "17QMPX5tphADbxTdSiu4BakYgZwehN3iPZ"
        ]
      }
    }
  ]
}
```

### Blocks

```js
let block = bitcoincashZmqDecoder.decodeBlock(hex);

const rawtx = "0100000002bf4dc9f952d440947ae0ca48080ab634f98543586394c1cab6e4ff8845881bb3000000006b48304502210080289bb59861043f80261dc6722f4f17482f3864bc29aa71f19680f9e2fa0210022054553f135420db950c5a8d8182cb37d6f853ec23c25d6285c6248b2588e5d7a001210396bf7c2b1ffacf871fcdcb2ed52864b677d094d1aa98cf422a0d096d178add3effffffff4839ea8f8dc6fdc25d8f5fb5b171b762aa2a3aa0d3157fc8cc853443cae9e6d7000000006b483045022100a84530e8480169ab54c0dcbcceb2044faf52d8f3417a75feaaecad20eafcd3e602201aeb08bf44c3e01af15ca67b786efa63a13f7c8e8ad21f40909b3d36f23d6e33012102be9b1c757ce7d2a65edb25828a9242aad4b3cce74c1aa53fcc0e24db22140e43ffffffff0260ae0a00000000001976a9149f48a63a5103e77fc8eb39852bd651fd8a08bd1388ac40420f00000000001976a91488e8119ac2556cb9e7148726e8109872f7b409f188ac36331200";
const network = {'pubKeyHash': 0x00, 'scriptHash': 0x05}
const txd = new TxDecoder(rawtx, network)
console.log(JSON.stringify(txd.toObject(), null, 2))

// returns
{
  "format": {
    "txid": "6dd25f39f324c085a013a2f55fb55392c280ca82c17e602249ddb2c7b6f6aede",
    "version": 1,
    "locktime": 0,
    "size": 226,
    "vsize": 226
  },
  "inputs": [
    {
      "txid": "91dff995f6d5d64a106d6bcbbd8304fcba0c557871cba814779dde889a1a1ad6",
      "n": 0,
      "script": "3045022100963b819d81006f04e2650524b10ec9ee9ed0ab305e707f54704d23cc25191f420220560dd8f0c32104b34aa3ac3af888867506a1c623100d1ff298e462e40041e6b941 0350b30d68fc3a1cec60f295928426bb12d10e98da9bcc92f8d98ac327265c9d8c",
      "sequence": 4294967295
    }
  ],
  "outputs": [
    {
      "satoshi": 7631108298,
      "value": "76.31108298",
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 c83de633455d60f7618bea613ebe596952c57f1e OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914c83de633455d60f7618bea613ebe596952c57f1e88ac",
        "type": "pubkeyhash",
        "addresses": [
          "1KFnJCZNFZ863BmWSsyWRJ4ESwJViiZnoa"
        ]
      }
    },
    {
      "satoshi": 19011700,
      "value": "0.19011700",
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 463b57510fda4a831cae313150088c67f5893479 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914463b57510fda4a831cae313150088c67f589347988ac",
        "type": "pubkeyhash",
        "addresses": [
          "17QMPX5tphADbxTdSiu4BakYgZwehN3iPZ"
        ]
      }
    }
  ]
}
```
