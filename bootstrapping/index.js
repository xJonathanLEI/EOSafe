const config = require("./config");

const Eos = require("eosjs");
const eos = Eos({
    httpEndpoint: "http://127.0.0.1:8888",
    chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    keyProvider: config.sysPrivKey
});

async function run() {
    await require("./system").initSys(eos);
}

run();