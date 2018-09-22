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

    auto primary_key() const
    {
        return id;
    }
};