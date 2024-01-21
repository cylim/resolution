// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// import "@openzeppelin/contracts@5.0.1/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// enum StatusType {
//     PENDING, 
//     COMPLETED, 
//     FAILED
// }

// struct Challenge {
//     uint256 deadline;
//     address payable owner;
//     address payable donationAddress;
//     StatusType status;
//     uint256 amount;
// }

// /// @custom:security-contact cylim226@gmail.com
// contract ChallengeContract is Ownable {
//     mapping(string => Challenge) public challenges;

//     address payable public MEME_ADDRESS = payable(address(0x765D0C57b993D3eD180001b817a6bCc13Ce7044e));
//     uint256 public SUCCESS_TOKEN_AMOUNT = 420 * 10**18;
//     uint256 public FAILURE_TOKEN_AMOUNT = 69 * 10**18;

//     event NewChallenge(
//         string indexed id,
//         address indexed userAddress,
//         uint256 deadline,
//         address donationAddress,
//         uint256 amount
//     );
//     event ChallengeSuccess(
//         string indexed id,
//         address indexed userAddress
//     );
//     event ChallengeFailure(
//         string indexed id,
//         address indexed userAddress,
//         address donationAddress,
//         uint256 amount
//     );

//     error NotChallengerOwner(address account);
//     error NotChallengePending();
//     error NotEnoughMemeToken();
//     error NotEnoughNativeToken();
    
//     constructor() Ownable(msg.sender) { 
//         setMemeAllowance();
//     } 

//     function setMemeAllowance() public onlyOwner {
//         IERC20(MEME_ADDRESS).approve(address(this), 696969696969696969696969696969);
//     }

//     function getChallenge(string calldata id) public view returns (Challenge memory c) {
//         return challenges[id];
//     }

//     function setFailureToken(uint256 amount) public onlyOwner {
//         FAILURE_TOKEN_AMOUNT = amount;
//     }

//     function setSuccessToken(uint256 amount) public onlyOwner {
//         SUCCESS_TOKEN_AMOUNT = amount;
//     }
    
//     function setMemeAddress(address payable _addr) public onlyOwner {
//         MEME_ADDRESS = _addr;
//         setMemeAllowance();
//     }

//     function _challengeCheck(Challenge memory challenge, uint256 amount) internal view virtual {
//         require(challenge.owner != address(0), "Invalid challenge owner address");
//         require(challenge.donationAddress != address(0), "Invalid donation address");
//         if (msg.sender != challenge.owner) {
//             revert NotChallengerOwner(msg.sender);
//         }
//         if (challenge.status != StatusType.PENDING) {
//             revert NotChallengePending();
//         }
//         if (IERC20(MEME_ADDRESS).balanceOf(address(this)) < amount) {
//             revert NotEnoughMemeToken();
//         }
//         if (address(this).balance < challenge.amount) {
//             revert NotEnoughNativeToken();
//         }
//     }

//     modifier challengeCheck(Challenge memory challenge, uint256 amount) {
//         _challengeCheck(challenge, amount);
//         _;
//     }

//     function create(string calldata id, address payable to, uint256 deadline) public payable {
//         require(challenges[id].owner == address(0), "Challenges existed");
//         require(to != address(0), "must has a donation addrress");
//         require(deadline > block.timestamp, "challenge deadline should later than current time");
//         require(msg.value >= 1 * 10**15, "staked tokens must be atlest 1 finney");

//         Challenge memory challenge = Challenge(deadline, payable(msg.sender), to, StatusType.PENDING, msg.value);
//         challenges[id] = challenge;

//         emit NewChallenge(id, msg.sender, deadline, to, msg.value);
//     }

//     function complete(string calldata id) public challengeCheck(challenges[id], SUCCESS_TOKEN_AMOUNT) {
//         Challenge storage challenge = challenges[id];
//         if(block.timestamp > challenge.deadline) {
//             forfeit(id);
//         } else {
//             // Transfer Ether to the challenger
//             (bool success, ) = challenge.owner.call{value: challenge.amount}("");
//             require(success, "Failed to withdraw stake");

//             // Transfer ERC20 tokens to the challenger
//             IERC20(MEME_ADDRESS).transferFrom(address(this), challenge.owner, SUCCESS_TOKEN_AMOUNT);

//             challenge.status = StatusType.COMPLETED;
//             challenges[id] = challenge;
//             emit ChallengeSuccess(id, challenge.owner);
//         }
//     }

//     function forfeit(string calldata id) public challengeCheck(challenges[id], FAILURE_TOKEN_AMOUNT) {
//         Challenge storage challenge = challenges[id];

//         // Transfer Ether to the donation address
//         (bool success, ) = challenges[id].donationAddress.call{value: challenges[id].amount}("");
//         require(success, "Failed to donate");

//         // Transfer ERC20 tokens to the challenger
//         IERC20(MEME_ADDRESS).transferFrom(address(this), challenges[id].owner, FAILURE_TOKEN_AMOUNT);

//         challenge.status = StatusType.FAILED;
//         challenges[id] = challenge;
//         emit ChallengeFailure(id, challenge.owner, challenge.donationAddress, challenge.amount);
//     }
// }