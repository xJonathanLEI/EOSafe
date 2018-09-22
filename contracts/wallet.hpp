#include <eosiolib/eosio.hpp>

using namespace eosio;

class wallet : public contract
{

  public:
    using contract::contract;

    /// @abi action
    void hi(account_name user)
    {
        print("Hello, ", name{user});
    }
};

EOSIO_ABI(wallet, (hi))