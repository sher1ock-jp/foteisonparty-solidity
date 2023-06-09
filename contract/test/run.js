// npx hardhat test
// run.js
const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("FoteisonGame");
    const gameContract = await gameContractFactory.deploy();
    const foteisonGame = await gameContract.deployed();
  
    console.log("Contract deployed to:", foteisonGame.address);
  };
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  runMain();