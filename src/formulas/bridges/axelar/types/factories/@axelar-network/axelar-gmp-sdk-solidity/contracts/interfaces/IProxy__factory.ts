/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IProxy,
  IProxyInterface,
} from "../../../../../@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IProxy";

const _abi = [
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "SetupFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "setupParams",
        type: "bytes",
      },
    ],
    name: "setup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IProxy__factory {
  static readonly abi = _abi;
  static createInterface(): IProxyInterface {
    return new utils.Interface(_abi) as IProxyInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IProxy {
    return new Contract(address, _abi, signerOrProvider) as IProxy;
  }
}