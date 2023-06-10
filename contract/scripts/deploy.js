// npx hardhat test
// run.js
const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("FoteisonGame");
  const gameContract = await gameContractFactory.deploy(

  );
  const foteisonGame = await gameContract.deployed();

  console.log("Contract deployed to:", foteisonGame.address);

  const squaresToCreate = [
    {
      squareId: 1,
      createrIcon: "KABAPULL",
      description: "BUSAIKU DESU",
      backendSquareId: 0,
      nftURL: "nft-url",
      questDescription: "buy BitCoin",
      questContractAddress: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
      userBalanceChange: 100
    },    
    {
      squareId: 2,
      createrIcon: "KABAPULL",
      description: "BUSAIKU DESU",
      backendSquareId: 1,
      nftURL: "nft-url",
      questDescription: "buy BitCoin",
      questContractAddress: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
      userBalanceChange: 100
    },    
    {
      squareId: 3,
      createrIcon: "KABAPULL",
      description: "BUSAIKU DESU",
      backendSquareId: 1,
      nftURL: "nft-url",
      questDescription: "buy BitCoin",
      questContractAddress: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
      userBalanceChange: 100
    },
  ]
    
  let txn;

  for(const squareParams of squaresToCreate) {
    txn = await foteisonGame.createSquare(
      squareParams.squareId,
      squareParams.createrIcon,
      squareParams.description,
      squareParams.backendSquareId,
      squareParams.nftURL,
      squareParams.questDescription,
      squareParams.questContractAddress,
      squareParams.userBalanceChange
    );
    await txn.wait();
  }

  // const squareId = 1;
  // const createrIcon = "KABAPULL";
  // const description = "BUSAIKU DESU";
  // const nftURL = "nft-url";
  // const questDescription = "buy BitCoin";
  // const questContractAddress = "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77";
  // const userBalanceChange = 100;

  // txn = await foteisonGame.createSquare(
  //     squareId,
  //     createrIcon,
  //     description,
  //     nftURL,
  //     questDescription,
  //     questContractAddress,
  //     userBalanceChange
  // );
  // await txn.wait();
  
  // test createSquare

  const square = await foteisonGame.squareIdToSquare(0);
  console.log(square);

  // test getSquare
  txn2 = await foteisonGame.getSquare(1);
  console.log(txn2);

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