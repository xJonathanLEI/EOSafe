#pragma once

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>

using namespace eosio;

/// @abi table configs
struct config
{
    account_name executor;
    extended_symbol token;
};