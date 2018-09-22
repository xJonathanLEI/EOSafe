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

void wallet::newdept(string name, permission_name permission)
{
    // Checks auth
    auto configs = get_config();
    require_auth2(configs.executor, PERMISSION_ADD_DEPARTMENT);

    // Finds next department id
    tbl_departments departments(_self, _self);
    auto last_department = departments.rbegin();
    uint64_t next_dept_id = last_department == departments.rend() ? 1 : last_department->id + 1;

    // Creates the department
    departments.emplace(_self, [&](department &new_department) {
        new_department.id = next_dept_id;
        new_department.name = name;
        new_department.permission = permission;
    });
}

void wallet::toggledept(uint64_t id, bool enabled)
{
    // Checks auth
    auto configs = get_config();
    require_auth2(configs.executor, PERMISSION_TOGGLE_DEPARTMENT);

    // Gets the department
    tbl_departments departments(_self, _self);
    auto target_department = departments.find(id);
    eosio_assert(target_department != departments.end(), "The department does not exist");

    // The status must be changed
    eosio_assert(target_department->enabled != enabled, "The department status is not being changed");

    // Changes the status
    departments.modify(target_department, _self, [&](department &modified_department) {
        modified_department.enabled = enabled;
    });
}

config wallet::get_config()
{
    tbl_configs configs(_self, _self);
    eosio_assert(configs.exists(), "The contract has not been initialized");
    return configs.get();
}