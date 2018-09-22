const config = require("./config");

const ecc = require("eosjs-ecc");
const fs = require("fs");

const Eos = require("eosjs");
const eos = Eos({
    httpEndpoint: "http://127.0.0.1:8888",
    chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    keyProvider: [
        config.sysPrivKey,
        config.walletKey,
        config.executorKey,
        config.cfoKey,
        config.executorOwner1,
        config.executorOwner2,
        config.executorOwner3
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

    console.log("Yielding wallet control to eosio.code...");
    await eos.transaction("eosio", eosio => {
        eosio.updateauth(config.walletName, "active", "owner", {
            threshold: 1,
            keys: [],
            accounts: [{ permission: { actor: config.walletName, permission: "eosio.code" }, weight: 1 }],
            waits: []
        });
    });
    await eos.transaction("eosio", eosio => {
        eosio.updateauth(config.walletName, "owner", "", {
            threshold: 1,
            keys: [],
            accounts: [{ permission: { actor: config.walletName, permission: "eosio.code" }, weight: 1 }],
            waits: []
        }, { authorization: config.walletName + "@owner" });
    });

    console.log("Filling demo data...");

    await eos.transaction("eosio.token", token => {
        token.transfer("eosio", config.walletName, "100000.0000 EOS", "ICO funds", { authorization: "eosio@active" });
    });

    await eos.transaction("eosio", eosio => {
        eosio.updateauth(config.executorName, "owner", "", {
            threshold: 3,
            keys: [
                { key: ecc.privateToPublic(config.executorOwner1), weight: 1 },
                { key: ecc.privateToPublic(config.executorOwner2), weight: 1 },
                { key: ecc.privateToPublic(config.executorOwner3), weight: 1 }
            ],
            accounts: [],
            waits: []
        }, { authorization: config.executorName + "@owner" });
    });

    await createNewAccount(eos, config.cfoName, ecc.privateToPublic(config.cfoKey));

    await eos.transaction("eosio", eosio => {
        eosio.updateauth(config.executorName, "active", "owner", {
            threshold: 1,
            keys: [],
            accounts: [{ permission: { actor: config.cfoName, permission: "active" }, weight: 1 }],
            waits: []
        }, { authorization: config.executorName + "@active" });
    });

    await eos.transaction("eosio", eosio => {
        eosio.updateauth(config.executorName, config.permissionAddDepartment, "active", {
            threshold: 1,
            keys: [],
            accounts: [{ permission: { actor: config.cfoName, permission: "active" }, weight: 1 }],
            waits: []
        }, { authorization: config.executorName + "@active" });
        eosio.linkauth(config.executorName, config.walletName, config.actionAddDepartment, config.permissionAddDepartment);
        eosio.updateauth(config.executorName, config.permissionToggleDepartment, "active", {
            threshold: 1,
            keys: [],
            accounts: [{ permission: { actor: config.cfoName, permission: "active" }, weight: 1 }],
            waits: []
        }, { authorization: config.executorName + "@active" });
        eosio.linkauth(config.executorName, config.walletName, config.actionToggleDepartment, config.permissionToggleDepartment);
        eosio.updateauth(config.executorName, config.permissionProcessApplication, "active", {
            threshold: 1,
            keys: [],
            accounts: [{ permission: { actor: config.cfoName, permission: "active" }, weight: 1 }],
            waits: []
        }, { authorization: config.executorName + "@active" });
        eosio.linkauth(config.executorName, config.walletName, config.actionProcessApplication, config.permissionProcessApplication);
    });

    await createNewAccount(eos, config.mkgMgrName, ecc.privateToPublic(config.mktMgrKey));
    await createNewAccount(eos, config.mktProgram1Name, ecc.privateToPublic(config.recipientKey));
    await createNewAccount(eos, config.mktProgram2Name, ecc.privateToPublic(config.recipientKey));

    await eos.transaction(["eosio", config.walletName], contracts => {
        contracts["eosio"].updateauth(config.executorName, config.mktPermissionName, "active", {
            threshold: 1,
            keys: [],
            accounts: [{ permission: { actor: config.mkgMgrName, permission: "active" }, weight: 1 }],
            waits: []
        }, { authorization: config.executorName + "@active" });
        contracts[config.walletName].newdept("Marketing", config.mktPermissionName, { authorization: config.executorName + "@" + config.permissionAddDepartment });
        contracts["eosio"].linkauth(config.executorName, config.walletName, "setdeptlmt", config.mktPermissionName);
        contracts["eosio"].linkauth(config.executorName, config.walletName, "addexpense", config.mktPermissionName);
        contracts["eosio"].linkauth(config.executorName, config.walletName, "rmexpense", config.mktPermissionName);
        contracts["eosio"].linkauth(config.executorName, config.walletName, "adjexpense", config.mktPermissionName);
        contracts["eosio"].linkauth(config.executorName, config.walletName, "spend", config.mktPermissionName);
    });

    // Apply for 1000.0000 EOS allowance

    await eos.transaction(config.walletName, wallet => {
        wallet.setdeptlmt(1, 10000000, { authorization: config.executorName + "@" + config.mktPermissionName });
    });

    // Approve application

    await eos.transaction(config.walletName, wallet => {
        wallet.processapp(1, 1, { authorization: config.executorName + "@" + config.permissionProcessApplication });
    });

    // Create 500.0000 EOS expenditure

    await eos.transaction(config.walletName, wallet => {
        wallet.addexpense(1, "Road Show Program", config.mktProgram1Name, 5000000, { authorization: config.executorName + "@" + config.mktPermissionName });
    });

    // Spend 100.0000 EOS

    await eos.transaction(config.walletName, wallet => {
        wallet.spend(1, 1, 1000000, "Rental for roadshow", { authorization: config.executorName + "@" + config.mktPermissionName });
    });

    // Spend 200.0000 EOS

    await eos.transaction(config.walletName, wallet => {
        wallet.spend(1, 1, 2000000, "Roadshow refreshment", { authorization: config.executorName + "@" + config.mktPermissionName });
    });

    console.log("System ready for demo!");
}

run();