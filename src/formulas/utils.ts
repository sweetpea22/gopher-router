import {ethers, BigNumber} from "ethers";
import {Chain, AccountDetails, Transfer} from "./interfaces";

export const sortByTransfersByCost = (t: Transfer[]): Transfer[] => {
    return t.sort((a ,b) => {
        if(a.cost.gt(b.cost)) {
          return 1;
        } else if (a.cost.lt(b.cost)){
          return -1;
        } else {
          return 0;
        }
      });
}

export const sortByTransfersByBalance = (t: Transfer[]): Transfer[] => {
  return t.sort((a ,b) => {
      if(a.balance.gt(b.balance)) {
        return 1;
      } else if (a.balance.lt(b.balance)){
        return -1;
      } else {
        return 0;
      }
    });
}

/**
 * Returns all the possibile transfers with assosiated costs, on one single chain.
 * @param amount 
 * @param AccountDetails 
 * @param costFn 
 * @returns 
 */
export const getAllTransfers = async (amount: BigNumber, AccountDetails: AccountDetails[], costFn: () => Promise<BigNumber>): Promise<Transfer[]> => {
    return await Promise.all(AccountDetails.map(async (account) => {
        const cost = await costFn();
        const hasFullBalance = account.balance.gte(amount.add(cost));
        return {
            chain: account.chain,
            balance: account.balance,
            hasFullBalance,
            cost,
        } as Transfer;
    }));
};

/**
 * Returns all the native balances for the supplied chains
 * @param chains 
 * @returns 
 */
export const getAllBalances = async (address: string, chains: Chain[]): Promise<AccountDetails[]> => {
    return await Promise.all(chains.map(async (chain) => {
        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
        const balance = await provider.getBalance(address);
        return {
            chain,
            balance
        };
    }));
};