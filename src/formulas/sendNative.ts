import { ethers, BigNumber } from "ethers";
import {Chain, AccountDetails, Transfer, BundledTransfers} from "./interfaces";
import {getAllBalances, getAllTransfers, sortTransfers} from "./utils";
import {calculate_base_gas_cost, calculate_bridge_cost} from "./costs";
import { findCheapestCombination } from "./lowestCost";

const chains: Chain[] = []; // import from somewhere

/**
 * Finds the cheapest bundle of transactions and returns those with their total cost.
 * @param transferAmount 
 * @param transfers 
 * @returns 
 */
export const calculateBundledTransactions = (transferAmount: BigNumber, transfers: Transfer[]): BundledTransfers => {
    const bundledTransfers = findCheapestCombination(transferAmount, transfers);
    if (bundledTransfers.length === 0) {
        return {
            transfers: bundledTransfers,
            bundleCost: BigNumber.from(0)
        }
    }
    const bundleCost = bundledTransfers.reduce((p,c) => p.add(c.cost), BigNumber.from(0));
    return {
        transfers: bundledTransfers,
        bundleCost
    }
};

/**
 * Returns best path to perfomring a native transfer
 * @param chains 
 * @param amount 
 * @param destinationChain 
 * @returns 
 */
export const calculateNativeTransfer = async (from: string, chains: Chain[], amount: BigNumber, destinationChain: Chain | null = null): Promise<AccountDetails[] | AccountDetails> => {
    // Step 1 - Get balances across all chains
    const accountDetails = await getAllBalances(from, chains);

    // Step 2.1 - If `destinationChain == null`
    // In this case we can simply find the best set of chains to combine that will make the transfer occur at the cheapest rate
    // Best outcome, we transfer everything from one single chain
    if (destinationChain == null) {
        
        // Contains a list of transfers with assosiated costs across all the chains
        let possibleTransfers = await getAllTransfers(amount, accountDetails, calculate_base_gas_cost);
        
        // Sort the transfers based on cheapest -> most expensive
        possibleTransfers = sortTransfers(possibleTransfers);
        
        // Find the cheapest single chain transfer, since its sorted it will always be the first one found
        const bestSingleChainTransfer = possibleTransfers.find(transfer => {
            if (transfer.hasFullBalance) {
                transfer.amountToTransfer = amount;
                return true;
            }
        });
        // Calculate multi-chain transfers
        const { transfers, bundleCost } = calculateBundledTransactions(amount, possibleTransfers);
        // Return the cheapeast option
        return bestSingleChainTransfer && bestSingleChainTransfer.cost!.lte(bundleCost) ? bestSingleChainTransfer : transfers;

    // Step 2.2 - If `destinationChain != null`
    // In this case we need to calculate the costs of bridging between chains, and finding the cheapest bundle
    // The best outcome is that the destinationChain is the cheapest, otherwise we need to combine all the options    
    } else {
        // There HAS TO BE a better way
        const destinationAccountDetails = accountDetails.find(chain => chain.chain.name === destinationChain.name);
        const bridgeChainsBalances = accountDetails.filter(chain => chain.chain.name !== destinationChain.name);

        // Lists of transfers with assosiated costs across all the chains
        const currentChainTransfer = await getAllTransfers(amount, [destinationAccountDetails!], calculate_base_gas_cost);
        let bridgedTransfers = await getAllTransfers(amount, bridgeChainsBalances, calculate_bridge_cost);
        
        // Sort the birdgedTransfer based on cheapest -> most expensive
        bridgedTransfers = sortTransfers(bridgedTransfers);

        if (currentChainTransfer[0].hasFullBalance) {
            // We want to prioritize the destinationChain if it has balance
            const { transfers, bundleCost } = calculateBundledTransactions(amount, bridgedTransfers);
            return currentChainTransfer[0].cost!.lte(bundleCost) ? currentChainTransfer[0] : transfers;
        } else {
            const bundledTransfers = [...currentChainTransfer, ...bridgedTransfers];
            const { transfers } = calculateBundledTransactions(amount, bundledTransfers);
            return transfers;
        }
    }
};
