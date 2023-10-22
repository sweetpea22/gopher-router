/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MessageReceiver,
  MessageReceiverInterface,
} from "../../../contracts/call-contract/MessageReceiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "gateway_",
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
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NotApprovedByGateway",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_value",
        type: "string",
      },
    ],
    name: "Executed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commandId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "sourceChain",
        type: "string",
      },
      {
        internalType: "string",
        name: "sourceAddress",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commandId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "sourceChain",
        type: "string",
      },
      {
        internalType: "string",
        name: "sourceAddress",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "tokenSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "executeWithToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gateway",
    outputs: [
      {
        internalType: "contract IAxelarGateway",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "message",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sourceChain",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60e0604052600760a0819052666e6f206461746160c81b60c09081526200002a916000919062000099565b503480156200003857600080fd5b5060405162000c5c38038062000c5c8339810160408190526200005b916200015c565b816001600160a01b038116620000845760405163e6c4247b60e01b815260040160405180910390fd5b6001600160a01b031660805250620001d19050565b828054620000a79062000194565b90600052602060002090601f016020900481019282620000cb576000855562000116565b82601f10620000e657805160ff191683800117855562000116565b8280016001018555821562000116579182015b8281111562000116578251825591602001919060010190620000f9565b506200012492915062000128565b5090565b5b8082111562000124576000815560010162000129565b80516001600160a01b03811681146200015757600080fd5b919050565b600080604083850312156200017057600080fd5b6200017b836200013f565b91506200018b602084016200013f565b90509250929050565b600181811c90821680620001a957607f821691505b60208210811415620001cb57634e487b7160e01b600052602260045260246000fd5b50919050565b608051610a62620001fa6000396000818160710152818161015901526102ff0152610a626000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80631c6ffa46116100505780631c6ffa46146100d257806349160658146100e7578063e21f37ce146100fa57600080fd5b8063116191b61461006c5780631a98b2e0146100bd575b600080fd5b6100937f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100d06100cb3660046105ad565b610102565b005b6100da61021a565b6040516100b49190610687565b6100d06100f53660046106dc565b6102a8565b6100da6103c5565b60008585604051610114929190610780565b6040519081900381207f1876eed9000000000000000000000000000000000000000000000000000000008252915073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690631876eed99061019e908e908e908e908e908e9089908d908d908d906004016107b9565b602060405180830381600087803b1580156101b857600080fd5b505af11580156101cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101f09190610818565b61020d57604051631403112d60e21b815260040160405180910390fd5b5050505050505050505050565b6001805461022790610841565b80601f016020809104026020016040519081016040528092919081815260200182805461025390610841565b80156102a05780601f10610275576101008083540402835291602001916102a0565b820191906000526020600020905b81548152906001019060200180831161028357829003601f168201915b505050505081565b600082826040516102ba929190610780565b6040519081900381207f5f6970c3000000000000000000000000000000000000000000000000000000008252915073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690635f6970c39061033e908b908b908b908b908b90899060040161087c565b602060405180830381600087803b15801561035857600080fd5b505af115801561036c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103909190610818565b6103ad57604051631403112d60e21b815260040160405180910390fd5b6103bb8787878787876103d2565b5050505050505050565b6000805461022790610841565b6103de818301836108d3565b80516103f291600091602090910190610457565b506103ff600187876104db565b503373ffffffffffffffffffffffffffffffffffffffff167f1e4f9f629e9bf6a2e822994db045170d1468c31ee7fc76742ba5276de101c5fa60006040516104479190610984565b60405180910390a2505050505050565b82805461046390610841565b90600052602060002090601f01602090048101928261048557600085556104cb565b82601f1061049e57805160ff19168380011785556104cb565b828001600101855582156104cb579182015b828111156104cb5782518255916020019190600101906104b0565b506104d792915061054f565b5090565b8280546104e790610841565b90600052602060002090601f01602090048101928261050957600085556104cb565b82601f106105225782800160ff198235161785556104cb565b828001600101855582156104cb579182015b828111156104cb578235825591602001919060010190610534565b5b808211156104d75760008155600101610550565b60008083601f84011261057657600080fd5b50813567ffffffffffffffff81111561058e57600080fd5b6020830191508360208285010111156105a657600080fd5b9250929050565b60008060008060008060008060008060c08b8d0312156105cc57600080fd5b8a35995060208b013567ffffffffffffffff808211156105eb57600080fd5b6105f78e838f01610564565b909b50995060408d013591508082111561061057600080fd5b61061c8e838f01610564565b909950975060608d013591508082111561063557600080fd5b6106418e838f01610564565b909750955060808d013591508082111561065a57600080fd5b506106678d828e01610564565b9150809450508092505060a08b013590509295989b9194979a5092959850565b600060208083528351808285015260005b818110156106b457858101830151858201604001528201610698565b818111156106c6576000604083870101525b50601f01601f1916929092016040019392505050565b60008060008060008060006080888a0312156106f757600080fd5b87359650602088013567ffffffffffffffff8082111561071657600080fd5b6107228b838c01610564565b909850965060408a013591508082111561073b57600080fd5b6107478b838c01610564565b909650945060608a013591508082111561076057600080fd5b5061076d8a828b01610564565b989b979a50959850939692959293505050565b8183823760009101908152919050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b89815260c0602082015260006107d360c083018a8c610790565b82810360408401526107e681898b610790565b90508660608401528281036080840152610801818688610790565b9150508260a08301529a9950505050505050505050565b60006020828403121561082a57600080fd5b8151801515811461083a57600080fd5b9392505050565b600181811c9082168061085557607f821691505b6020821081141561087657634e487b7160e01b600052602260045260246000fd5b50919050565b868152608060208201526000610896608083018789610790565b82810360408401526108a9818688610790565b915050826060830152979650505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156108e557600080fd5b813567ffffffffffffffff808211156108fd57600080fd5b818401915084601f83011261091157600080fd5b813581811115610923576109236108bd565b604051601f8201601f19908116603f0116810190838211818310171561094b5761094b6108bd565b8160405282815287602084870101111561096457600080fd5b826020860160208301376000928101602001929092525095945050505050565b600060208083526000845481600182811c9150808316806109a657607f831692505b8583108114156109c457634e487b7160e01b85526022600452602485fd5b8786018381526020018180156109e157600181146109f257610a1d565b60ff19861682528782019650610a1d565b60008b81526020902060005b86811015610a17578154848201529085019089016109fe565b83019750505b5094999850505050505050505056fea2646970667358221220d429429b251f114d95cf7d9daa5211b284667a514614a5fcf39c77c7703621f464736f6c63430008090033";

type MessageReceiverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MessageReceiverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MessageReceiver__factory extends ContractFactory {
  constructor(...args: MessageReceiverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    gateway_: PromiseOrValue<string>,
    _gasReceiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MessageReceiver> {
    return super.deploy(
      gateway_,
      _gasReceiver,
      overrides || {}
    ) as Promise<MessageReceiver>;
  }
  override getDeployTransaction(
    gateway_: PromiseOrValue<string>,
    _gasReceiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(gateway_, _gasReceiver, overrides || {});
  }
  override attach(address: string): MessageReceiver {
    return super.attach(address) as MessageReceiver;
  }
  override connect(signer: Signer): MessageReceiver__factory {
    return super.connect(signer) as MessageReceiver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MessageReceiverInterface {
    return new utils.Interface(_abi) as MessageReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MessageReceiver {
    return new Contract(address, _abi, signerOrProvider) as MessageReceiver;
  }
}
