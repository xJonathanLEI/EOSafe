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

    const uint8_t APPLICATION_STATUS_PENDING = 1;
    const uint8_t APPLICATION_STATUS_APPROVED = 2;
    const uint8_t APPLICATION_STATUS_REJECTED = 3;

    const permission_name PERMISSION_ADD_DEPARTMENT = N(newdept);
    const permission_name PERMISSION_TOGGLE_DEPARTMENT = N(tgldept);
    const permission_name PERMISSION_PROCESS_APPLICATION = N(processapp);

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
    typedef multi_index<N(applications), application> tbl_applications;
    typedef multi_index<N(expenditures), expenditure> tbl_expenditures;

    /* Interfaces */

    /// @abi action init
    void init(account_name executor, extended_symbol token);
    /// @abi action newdept
    void newdept(string name, permission_name permission);
    /// @abi action toggledept
    void toggledept(uint64_t id, bool enabled);
    /// @abi action setdeptlmt
    void setdeptlmt(uint64_t id, uint64_t new_allowance);
    /// @abi action processapp
    void processapp(uint64_t id, bool approve);

  private:
    config get_config();
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
                EOSIO_API(wallet, (init)(newdept)(toggledept)(setdeptlmt)(processapp))
            }
        }
    }
}
