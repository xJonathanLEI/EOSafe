const config = require("./config");

const ecc = require("eosjs-ecc");
const fs = require("fs");

const Eos = require("eosjs");
const eos = Eos({
    httpEndpoint: "http://127.0.0.1:8888",
    chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    keyProvider: [
        config.sysPrivKey,
        config.walletKey
    ]
});

async function createNewAccount(eos, name, pubKey) {

    console.log("Creating account \x1b[33m" + name + "\x1b[0m");

    await eos.transaction(tr => {
        tr.newaccount({
            creator: 'eosio',
            name: name,
            owner: pubKey,
            active: pubKey
        });

        tr.buyrambytes({
            payer: 'eosio',
            receiver: name,
            bytes: 1024 * 1024 * 10
        });

        tr.delegatebw({
            from: 'eosio',
            receiver: name,
            stake_net_quantity: '1000.0000 EOS',
            stake_cpu_quantity: '1000.0000 EOS',
            transfer: 0
        });
    });
}

async function run() {

    console.log("Performing system initialization...");
    await require("./system").initSys(eos);

    console.log("Creating and deploying wallet...");
    await createNewAccount(eos, config.walletName, ecc.privateToPublic(config.walletKey));
    const walletWasm = fs.readFileSync("../contracts/build/wallet.wasm");
    const walletAbi = JSON.parse(fs.readFileSync("../contracts/build/wallet.abi"));
    await eos.setcode(config.walletName, 0, 0, walletWasm);
    await eos.setabi(config.walletName, walletAbi);

    await createNewAccount(eos, config.executorName, ecc.privateToPublic(config.executorKey));

    console.log("Initializing wallet with executor...");
    await eos.transaction(config.walletName, wallet => {
        wallet.init(config.executorName, "4,EOS@eosio.token", 100000000, { authorization: config.walletName + "@active" });
    });
}

run();