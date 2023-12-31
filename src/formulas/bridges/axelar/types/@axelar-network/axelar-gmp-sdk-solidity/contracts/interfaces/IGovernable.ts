/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export interface IGovernableInterface extends utils.Interface {
  functions: {
    "governance()": FunctionFragment;
    "mintLimiter()": FunctionFragment;
    "transferGovernance(address)": FunctionFragment;
    "transferMintLimiter(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "governance"
      | "mintLimiter"
      | "transferGovernance"
      | "transferMintLimiter"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintLimiter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferGovernance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferMintLimiter",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintLimiter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferMintLimiter",
    data: BytesLike
  ): Result;

  events: {
    "GovernanceTransferred(address,address)": EventFragment;
    "MintLimiterTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GovernanceTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MintLimiterTransferred"): EventFragment;
}

export interface GovernanceTransferredEventObject {
  previousGovernance: string;
  newGovernance: string;
}
export type GovernanceTransferredEvent = TypedEvent<
  [string, string],
  GovernanceTransferredEventObject
>;

export type GovernanceTransferredEventFilter =
  TypedEventFilter<GovernanceTransferredEvent>;

export interface MintLimiterTransferredEventObject {
  previousGovernance: string;
  newGovernance: string;
}
export type MintLimiterTransferredEvent = TypedEvent<
  [string, string],
  MintLimiterTransferredEventObject
>;

export type MintLimiterTransferredEventFilter =
  TypedEventFilter<MintLimiterTransferredEvent>;

export interface IGovernable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IGovernableInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    governance(overrides?: CallOverrides): Promise<[string]>;

    mintLimiter(overrides?: CallOverrides): Promise<[string]>;

    transferGovernance(
      newGovernance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferMintLimiter(
      newGovernance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  governance(overrides?: CallOverrides): Promise<string>;

  mintLimiter(overrides?: CallOverrides): Promise<string>;

  transferGovernance(
    newGovernance: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferMintLimiter(
    newGovernance: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    governance(overrides?: CallOverrides): Promise<string>;

    mintLimiter(overrides?: CallOverrides): Promise<string>;

    transferGovernance(
      newGovernance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferMintLimiter(
      newGovernance: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "GovernanceTransferred(address,address)"(
      previousGovernance?: PromiseOrValue<string> | null,
      newGovernance?: PromiseOrValue<string> | null
    ): GovernanceTransferredEventFilter;
    GovernanceTransferred(
      previousGovernance?: PromiseOrValue<string> | null,
      newGovernance?: PromiseOrValue<string> | null
    ): GovernanceTransferredEventFilter;

    "MintLimiterTransferred(address,address)"(
      previousGovernance?: PromiseOrValue<string> | null,
      newGovernance?: PromiseOrValue<string> | null
    ): MintLimiterTransferredEventFilter;
    MintLimiterTransferred(
      previousGovernance?: PromiseOrValue<string> | null,
      newGovernance?: PromiseOrValue<string> | null
    ): MintLimiterTransferredEventFilter;
  };

  estimateGas: {
    governance(overrides?: CallOverrides): Promise<BigNumber>;

    mintLimiter(overrides?: CallOverrides): Promise<BigNumber>;

    transferGovernance(
      newGovernance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferMintLimiter(
      newGovernance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    governance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintLimiter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferGovernance(
      newGovernance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferMintLimiter(
      newGovernance: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
