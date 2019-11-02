# bitcoin-zmq-decoder

## install

```
npm i bitcoin-zmq-decoder --save
```

## usage

First `require` the lib and pass in the network to the constructor. Options are `"mainnet"` and `"testnet"`.

```js
let BitcoinZMQDecoder = require("bitcoin-zmq-decoder");
let bitcoinZmqDecoder = new BitcoinZMQDecoder("mainnet");
```

### Transactions

Pass the hex of a transaction returned from `bitcoind` via zeromq

```js
bitcoinZmqDecoder.decodeTransaction(message);

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

Pass the hex of a block returned from `bitcoind` via zeromq

```js
let block = bitcoinZmqDecoder.decodeBlock(hex);

// returns

{
  "transactions": 162,
  "totalBCHSent": 39478786896,
  "reward": 1250000000,
  "prevHash": "8e31a5d886ddf478924504eb93e0e9d4e9540080ffc434010000000000000000",
  "id": "eeb1c8194c5487a4d78e9bea4c755a7abe526feab59589010000000000000000",
  "hash": "0000000000000000018995b5ea6f52be7a5a754cea9b8ed7a487544c19c8b1ee",
  "merkleRoot": "9d859cf70f76fbeedf1537c1d4b5dcc6ceab02ff637b232711b31e1dd78feea2",
  "version": 536870912,
  "time": 1532932006,
  "bits": 402773255,
  "nonce": 1127365190
}

```
