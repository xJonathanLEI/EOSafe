#pragma once

#include <eosiolib/eosio.hpp>

#include <string>

using namespace std;
using namespace eosio;

/// @abi table expenditures
struct expenditure
{
    uint64_t id;
    string name;
    account_name recipient;
    uint64_t monthly_allowance;

    auto primary_key() const
    {
        return id;
    }
};