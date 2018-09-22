#include "wallet.hpp"

void wallet::init(account_name executor, extended_symbol token)
{
    // The contract's permission shall be changed to eosio.code
    // after calling init to remove any risk of being hacked.
    require_auth(_self);

    // The executor must exist
    eosio_assert(is_account(executor), "The executor account must exist");

    // The token must exist
    eosio_assert(is_account(token.contract), "The token contract must exist");
    tbl_currency_stats currency(token.contract, token.value >> 8);
    eosio_assert(currency.begin() != currency.end(), "The token does not exist");

    // The contract must have not been inited
    tbl_configs configs(_self, _self);
    eosio_assert(!configs.exists(), "The contract has already been initialized");

    //  Writes the configs
    config new_config{
        .executor = executor,
        .token = token};
    configs.set(new_config, _self);
}