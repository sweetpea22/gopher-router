/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MessageSender,
  MessageSenderInterface,
} from "../../../contracts/call-contract/MessageSender";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_gateway",
        type: "address",
      },
      {
        internalType: "address",
        name: "_gasReceiver",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "destinationChain",
        type: "string",
      },
      {
        internalType: "string",
        name: "destinationAddress",
        type: "string",
      },
      {
        internalType: "string",
        name: "value_",
        type: "string",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c060405234801561001057600080fd5b5060405161054e38038061054e83398101604081905261002f91610062565b6001600160a01b039182166080521660a052610095565b80516001600160a01b038116811461005d57600080fd5b919050565b6000806040838503121561007557600080fd5b61007e83610046565b915061008c60208401610046565b90509250929050565b60805160a0516104946100ba6000396000610108015260006101b701526104946000f3fe60806040526004361061001e5760003560e01c80630eabeffe14610023575b600080fd5b61003661003136600461027b565b610038565b005b600034116100a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f476173207061796d656e74206973207265717569726564000000000000000000604482015260640160405180910390fd5b600082826040516020016100bb92919061033e565b60408051601f19818403018152908290527f0c93e3bb000000000000000000000000000000000000000000000000000000008252915073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690630c93e3bb90349061014b9030908c908c908c908c908a9033906004016103a7565b6000604051808303818588803b15801561016457600080fd5b505af1158015610178573d6000803e3d6000fd5b50506040517f1c92115f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169350631c92115f92506101f791508a908a908a908a908890600401610417565b600060405180830381600087803b15801561021157600080fd5b505af1158015610225573d6000803e3d6000fd5b5050505050505050505050565b60008083601f84011261024457600080fd5b50813567ffffffffffffffff81111561025c57600080fd5b60208301915083602082850101111561027457600080fd5b9250929050565b6000806000806000806060878903121561029457600080fd5b863567ffffffffffffffff808211156102ac57600080fd5b6102b88a838b01610232565b909850965060208901359150808211156102d157600080fd5b6102dd8a838b01610232565b909650945060408901359150808211156102f657600080fd5b5061030389828a01610232565b979a9699509497509295939492505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b602081526000610352602083018486610315565b949350505050565b6000815180845260005b8181101561038057602081850181015186830182015201610364565b81811115610392576000602083870101525b50601f01601f19169290920160200192915050565b600073ffffffffffffffffffffffffffffffffffffffff808a16835260a060208401526103d860a08401898b610315565b83810360408501526103eb81888a610315565b905083810360608501526103ff818761035a565b92505080841660808401525098975050505050505050565b60608152600061042b606083018789610315565b828103602084015261043e818688610315565b90508281036040840152610452818561035a565b9897505050505050505056fea264697066735822122090fa62c86c6e9038857a375b8da03677ba2f6bef54e0b6a8e5c40f163e450c5d64736f6c63430008090033";

type MessageSenderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MessageSenderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MessageSender__factory extends ContractFactory {
  constructor(...args: MessageSenderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _gateway: PromiseOrValue<string>,
    _gasReceiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MessageSender> {
    return super.deploy(
      _gateway,
      _gasReceiver,
      overrides || {}
    ) as Promise<MessageSender>;
  }
  override getDeployTransaction(
    _gateway: PromiseOrValue<string>,
    _gasReceiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gateway, _gasReceiver, overrides || {});
  }
  override attach(address: string): MessageSender {
    return super.attach(address) as MessageSender;
  }
  override connect(signer: Signer): MessageSender__factory {
    return super.connect(signer) as MessageSender__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MessageSenderInterface {
    return new utils.Interface(_abi) as MessageSenderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MessageSender {
    return new Contract(address, _abi, signerOrProvider) as MessageSender;
  }
}
