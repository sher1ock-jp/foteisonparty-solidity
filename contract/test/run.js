// npx hardhat test
// run.js
const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("FoteisonGame");
    const gameContract = await gameContractFactory.deploy(

    );
    const foteisonGame = await gameContract.deployed();
  
    console.log("Contract deployed to:", foteisonGame.address);
      
    let txn;

    const squareId = 1;
    const createrIcon = "KABAPULL";
    const description = "BUSAIKU DESU";
    const nftURL = "nft-url";
    const questDescription = "buy BitCoin";
    const questContractAddress = "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77";
    const userBalanceChange = 100;

    txn = await foteisonGame.createSquare(
        squareId,
        createrIcon,
        description,
        nftURL,
        questDescription,
        questContractAddress,
        userBalanceChange
    );
    await txn.wait();
    
    const square = await foteisonGame.squareIdToSquare(squareId);
    console.log(square.description);
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