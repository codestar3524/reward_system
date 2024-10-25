// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor()
        ERC20("YAN_TOKEN", "YAN")
        Ownable(msg.sender)
        ERC20Permit("YAN_TOKEN")
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    function burnToken(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}