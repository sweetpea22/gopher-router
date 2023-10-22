pragma solidity >=0.7.0 <0.9.0;

interface ERC20{
  function deposit() external payable;
  function withdraw(uint256 amount) external;
  function approve(address guy, uint256 wad) external;
}

interface Gateway{
    function sendToken(
        string memory destinationChain,
        string memory destinationAddress,
        string memory symbol,
        uint256 amount
    ) external;
}

contract AxelarJump {
  ERC20 weth;
  Gateway gateway;

  constructor(address _weth, address _gateway) {
    weth = ERC20(_weth);
    gateway = Gateway(_gateway);
  }

  function sendEth(string memory _destChain, string memory _destAddress, string memory _symbol) public payable {
    weth.deposit{value: msg.value}();
    weth.approve(address(gateway), msg.value);
    gateway.sendToken(_destChain, _destAddress, _symbol, msg.value);
  }

  function receiveEth(uint256 _amount) public payable {
    weth.withdraw(_amount);
  }
}
