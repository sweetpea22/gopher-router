import {ethers, BigNumber} from "ethers";
import {ChainInfo, AccountDetails, Transfer} from "../app/interfaces";
import { calculateBaseGasCost, calculateBridgeCost } from "./gasCosts";

export const sortByTransfersByCost = (t: Transfer[]): Transfer[] => {
    return t.sort((a ,b) => {
        if(a.feeData.cost.gt(b.feeData.cost)) {
          return 1;
        } else if (a.feeData.cost.lt(b.feeData.cost)){
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

interface IGetAllTransfers {
  amount: BigNumber;
  accountDetails: AccountDetails[];
  destinationChain?: ChainInfo;
  to: string
}
/**
 * Returns all the possibile transfers with assosiated costs, on one single chain.
 * @param amount 
 * @param AccountDetails 
 * @param costFn 
 * @returns 
 */
export const getAllTransfers = async ({amount, accountDetails, destinationChain, to}: IGetAllTransfers): Promise<Transfer[]> => {
  const tranfers = await Promise.all(accountDetails.map(async (account) => {
    const feeData = destinationChain ? await calculateBridgeCost(account.chain, destinationChain, to) : await calculateBaseGasCost(account.chain);
    if (!feeData || Object.keys(feeData).length === 0) return {} as Transfer;
    const hasFullBalance = account.balance.gte(amount.add(feeData.cost));
    return {
        chain: account.chain,
        balance: account.balance,
        hasFullBalance,
        feeData,
    } as Transfer;
  }));
  return tranfers.filter(x => Object.keys(x).length > 0);  // const tranfers = await Promise.all(accountDetails.map(async (account) => {
};

/**
 * Returns all the native balances for the supplied chains
 * @param chains 
 * @returns 
 */
export const getAllBalances = async (address: string, chains: ChainInfo[]): Promise<AccountDetails[]> => {
    return await Promise.all(chains.map(async (chain) => {
        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
        const balance = await provider.getBalance(address);
        return {
            chain,
            balance
        };
    }));
};