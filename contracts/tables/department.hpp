#pragma once

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>

#include <string>

using namespace std;
using namespace eosio;

/// @abi table departments
struct department
{
    uint64_t id;
    string name;
    permission_name permission;
    bool enabled = true;
    uint64_t monthly_allowance = 0;

    auto primary_key() const
    {
        return id;
    }
};