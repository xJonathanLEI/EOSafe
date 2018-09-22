#include <eosiolib/eosio.hpp>

using namespace eosio;

class wallet : public contract
{

  public:
    using contract::contract;

    /// @abi action hi
    void hi(account_name user);
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
                EOSIO_API(wallet, (hi))
            }
        }
    }
}
