//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublivMintEnabled;
    string internal baseTokenURI;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("RoboPunks", "RP") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled)
        external
        onlyOwner
    {
        isPublivMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenURI(string calldata _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Token does not exist!");
        return
            string(
                abi.encodePacked(
                    baseTokenURI,
                    Strings.toString(tokenId),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "Withdraw failed!");
    }

    function mint(uint256 _quantity) public payable {
      require(isPublivMintEnabled, "minting not enabled!");
      require(msg.value == _quantity * mintPrice, "wrong mint value");
      require(totalSupply + _quantity <= maxSupply, "sold out");
      require(walletMints[msg.sender] + _quantity <= maxPerWallet, "exceed max per wallet");

      for (uint256 i = 0; i < _quantity; i++) {
        uint256 newTokenId = totalSupply + 1;
        totalSupply++;
        _safeMint(msg.sender, newTokenId);
      }
    }
}
