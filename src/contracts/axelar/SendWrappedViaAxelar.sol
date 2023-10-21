// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IERC20} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

// get weth contract methods
interface ERC20{
  function deposit() external payable;
  function withdraw(uint256 amount) external;
  function approve(address guy, uint256 wad) external;
}

// Wrap and send contract that inherits from AxelarExecutable
contract SendWrappedViaAxelar is AxelarExecutable {
    // Immutable reference to the gas service contract
    IAxelarGasService public immutable gasService;

    // Variables to track airdrop details
    uint256 public amountReceived;
    address[] public airdropRecipients;

    // Constructor to initialize the contract
    constructor(address weth_, address gateway_, address gasReceiver_) AxelarExecutable(gateway_) {
        // Initialize the gas service contract
        gasService = IAxelarGasService(gasReceiver_);
        weth = ERC20(_weth);
    }

    // Need GMP to send wrapped tokens...right? 
    function sendEth(
        string memory destinationChain,
        string memory destinationAddress,
        string memory wethAddress,
        uint256 amount
    ) public payable {
        // Require a gas payment for the transaction
        require(msg.value > 0, "Gas payment is required");

        // Get the token address associated with the provided symbols (test simple transfers)
        address tokenAddress = gateway.tokenAddresses(symbol);

        // idk if weth is on the gateway?
        address wethAddress = gateway.tokenAddresses(wethAddress);

        // Transfer tokens from sender to this contract
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);

        // Approve the gateway to spend tokens on behalf of this contract
        IERC20(tokenAddress).approve(address(gateway), amount);

        // Encode the recipient addresses into a payload
        bytes memory payload = abi.encode(destinationAddresses);

        // Pay for native gas using the gas service contract
        gasService.payNativeGasForContractCallWithToken{value: msg.value}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            symbol,
            amount,
            msg.sender
        );

        // Initiate a contract call on the gateway
        gateway.callContractWithToken(
            destinationChain,
            destinationAddress,
            payload,
            symbol,
            amount
        );
    }


    // Internal function to execute airdrop on the current chain
    function _executeWithToken(
        string calldata,
        string calldata,
        bytes calldata payload,
        string calldata tokenSymbol,
        uint256 amount
    ) internal override {
        // Decode the payload to get the recipient addresses
        address[] memory recipients = abi.decode(payload, (address[]));

        // Get the token address associated with the provided symbol
        address tokenAddress = gateway.tokenAddresses(tokenSymbol);

        // Set amountReceived and airdropRecipients variables
        amountReceived = amount;

        // Calculate the amount of tokens to send to each recipient
        uint256 sentAmount = amount / recipients.length;

        // Transfer tokens to each recipient
    }

    function unwrap(uint256 _amount) public payable {
        weth.withdraw(_amount);
  }
}