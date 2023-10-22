import { ChangeEvent, useEffect, useState, useCallback, useContext } from 'react';
import { BalancesData } from '@/app/context/balances';
import {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} from "@axelar-network/axelarjs-sdk";
import { ethers } from 'ethers';
import {  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
  erc20ABI,
  useAccount,
} from "wagmi";
import AxelarABI from '@/contracts/axelar/ABI.json';

const SPLITS_CONTRACT_ADDRESS="0x2c852e740B62308c46DD29B982FBb650D063Bd07"


export default function SplitFunds() {
  const { address } = useAccount();
  const { selected, ethBalance, tokenBalances } = useContext(BalancesData);
  const [recipientAddresses, setRecipientAddresses] = useState("");
   const [isSendButtonVisible, setIsSendButtonVisible] = useState(false);
  const [isApproveButtonVisible, setIsApproveButtonVisible] = useState(true);
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  
  const [amountToSplit, setAmountToSplit] = useState("");
  const [gasFee, setGasFee] = useState(0);
  
  
  const changeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountToSplit(e.target.value)
  }


   const { data: useContractWriteData, write } = useContractWrite({
    address: SPLITS_CONTRACT_ADDRESS,
    abi: AxelarABI.abi,
    functionName: "sendToMany",
    args: [
      "Avalanche",
      SPLITS_CONTRACT_ADDRESS,
      recipientAddresses.split(","),
      "aUSDC",
      ethers.utils.parseUnits(amountToSplit, 'gwei'),
     ],
    //@ts-ignore
    value: gasFee,
  });

  const { data: useWaitForTransactionData, isSuccess } = useWaitForTransaction({
    // Calling a hook to wait for the transaction to be mined
    hash: useContractWriteData?.hash,
  });

  // send split
  const handleSendAirdrop = async () => {
    if (!(amountToSplit && recipientAddresses)) {
      <p>Invalid Input</p>
    }
    write();
    return (
      <>
        Sending the split...
      </>
    )
  };

  useEffect(() => {
    const api = new AxelarQueryAPI({ environment: Environment.TESTNET });
    // Estimate Gas
    const gasEstimator = async () => {
      const gas = await api.estimateGasFee(
        EvmChain.POLYGON,
        EvmChain.AVALANCHE,
        GasToken.MATIC,
        700000,
        2
      );
      //@ts-ignore
      setGasFee(gas);
    };
    gasEstimator();

  }, [
    useContractWriteData,
    useWaitForTransactionData,
  ]);

  return (
    <div className="mt-4 py-5 px-4 sm:px-6 lg:px-8 rounded-xl min-w-full divide-y divide-gray-800 ring-1 ring-inset ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-semibold leading-6 text-gray-100">Cross-chain Split</h1>
        </div>
      </div>
      {/* Table */}
      <div className="mt-5 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <h1>Split funds cross-chain</h1>
             <div className="flex flex-col mb-4">
              <label className="font-semibold mb-2">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="bg-gray-900 border border-gray-700 rounded-lg p-2"
                // onChange={changeAmount}
              />
            </div>
            {isTextareaVisible && (
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-2">Addresses</label>
                <textarea
                  placeholder="Enter addresses (separate with a comma)"
                  className="bg-gray-900 border border-gray-700 rounded-lg p-2 h-32"
                  onChange={(e) => setRecipientAddresses(e.target.value)}
                />
              </div>
            )}
            {isSendButtonVisible && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full"
                onClick={handleSendAirdrop}
              >
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
