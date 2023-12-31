/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IContractIdentifier,
  IContractIdentifierInterface,
} from "../../../../../@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IContractIdentifier";

const _abi = [
  {
    inputs: [],
    name: "contractId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export class IContractIdentifier__factory {
  static readonly abi = _abi;
  static createInterface(): IContractIdentifierInterface {
    return new utils.Interface(_abi) as IContractIdentifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IContractIdentifier {
    return new Contract(address, _abi, signerOrProvider) as IContractIdentifier;
  }
}
