#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/singleton.hpp>

#include "tables/tables.hpp"

using namespace eosio;

class wallet : public contract
{
  public:
    using contract::contract;

    /* Constants */
    const permission_name PERMISSION_ADD_DEPARTMENT = N(newdept);

    /* Structs */

    struct currency_stats
    {
        asset supply;
        asset max_supply;
        account_name issuer;

        uint64_t primary_key() const { return supply.symbol.name(); }
    };
    typedef multi_index<N(stat), currency_stats> tbl_currency_stats;

    /* Tables */

    typedef singleton<N(configs), config> tbl_configs;
    typedef multi_index<N(departments), department> tbl_departments;

    /* Interfaces */

    /// @abi action init
    void init(account_name executor, extended_symbol token);
};

extern "C"
{
    void apply(uint64_t receiver, uint64_t code, uint64_t action)
    {
        auto self = receiver;
        wallet thiscontract(self);
        if (code == self)
        {
            switch (action)
            {
                EOSIO_API(wallet, (init))
            }
        }
    }
}
