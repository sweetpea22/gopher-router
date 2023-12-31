/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  MessageSender,
  MessageSenderInterface,
} from "../../../../contracts/call-contract-with-token/contracts/MessageSender";

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
        internalType: "address[]",
        name: "destinationAddresses",
        type: "address[]",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sendToMany",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c060405234801561001057600080fd5b5060405161088f38038061088f83398101604081905261002f91610062565b6001600160a01b0391821660a05216608052610095565b80516001600160a01b038116811461005d57600080fd5b919050565b6000806040838503121561007557600080fd5b61007e83610046565b915061008c60208401610046565b90509250929050565b60805160a0516107c86100c76000396000818160d90152818161023301526103a3015260006102e701526107c86000f3fe60806040526004361061001e5760003560e01c8063fbd9497b14610023575b600080fd5b610036610031366004610471565b610038565b005b600034116100a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f476173207061796d656e74206973207265717569726564000000000000000000604482015260640160405180910390fd5b6040517f935b13f60000000000000000000000000000000000000000000000000000000081526000906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063935b13f6906101109087908790600401610597565b60206040518083038186803b15801561012857600080fd5b505afa15801561013c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016091906105cb565b6040517f23b872dd000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018490529091506001600160a01b038216906323b872dd90606401602060405180830381600087803b1580156101ca57600080fd5b505af11580156101de573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061020291906105ef565b506040517f095ea7b30000000000000000000000000000000000000000000000000000000081526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811660048301526024820184905282169063095ea7b390604401602060405180830381600087803b15801561028657600080fd5b505af115801561029a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102be91906105ef565b50600086866040516020016102d4929190610611565b60405160208183030381529060405290507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663c62c200234308e8e8e8e888d8d8d336040518c63ffffffff1660e01b81526004016103449a999897969594939291906106ac565b6000604051808303818588803b15801561035d57600080fd5b505af1158015610371573d6000803e3d6000fd5b50506040517fb54170840000000000000000000000000000000000000000000000000000000081526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016935063b541708492506103e991508e908e908e908e9088908d908d908d9060040161072c565b600060405180830381600087803b15801561040357600080fd5b505af1158015610417573d6000803e3d6000fd5b505050505050505050505050505050565b60008083601f84011261043a57600080fd5b50813567ffffffffffffffff81111561045257600080fd5b60208301915083602082850101111561046a57600080fd5b9250929050565b600080600080600080600080600060a08a8c03121561048f57600080fd5b893567ffffffffffffffff808211156104a757600080fd5b6104b38d838e01610428565b909b50995060208c01359150808211156104cc57600080fd5b6104d88d838e01610428565b909950975060408c01359150808211156104f157600080fd5b818c0191508c601f83011261050557600080fd5b81358181111561051457600080fd5b8d60208260051b850101111561052957600080fd5b6020830197508096505060608c013591508082111561054757600080fd5b506105548c828d01610428565b9a9d999c50979a9699959894979660800135949350505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6020815260006105ab60208301848661056e565b949350505050565b6001600160a01b03811681146105c857600080fd5b50565b6000602082840312156105dd57600080fd5b81516105e8816105b3565b9392505050565b60006020828403121561060157600080fd5b815180151581146105e857600080fd5b60208082528181018390526000908460408401835b86811015610654578235610639816105b3565b6001600160a01b031682529183019190830190600101610626565b509695505050505050565b6000815180845260005b8181101561068557602081850181015186830182015201610669565b81811115610697576000602083870101525b50601f01601f19169290920160200192915050565b60006001600160a01b03808d16835260e060208401526106d060e084018c8e61056e565b83810360408501526106e3818b8d61056e565b905083810360608501526106f7818a61065f565b9050838103608085015261070c81888a61056e565b60a0850196909652509290921660c0909101525098975050505050505050565b60a08152600061074060a083018a8c61056e565b828103602084015261075381898b61056e565b90508281036040840152610767818861065f565b9050828103606084015261077c81868861056e565b915050826080830152999850505050505050505056fea2646970667358221220ffa862bd1e571e12955506e1171bb17061c96c284bb40275d17d8f0bcd249d6e64736f6c63430008090033";

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
