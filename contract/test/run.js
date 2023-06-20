// npx hardhat test
// run.js
const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("FoteisonGame");
    const gameContract = await gameContractFactory.deploy();
    const foteisonGame = await gameContract.deployed();
  
    console.log("Contract deployed to:", foteisonGame.address);

    const squaresToCreate = [
      {
        createrENS: "yusuke.eth",
        squareId: 500,
        backendSquareId: 1275,
        description: "temporary",
        nftURL: "https://thumb.ac-illust.com/41/41506eee0d35c3245ed3635d8ffbd2e7_t.jpeg",
        squareBalance: 100,
        IsBalanceAdd: true,
        questContractAddress: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
        questDescription: "buy BitCoin",
        createrIcon: "temporary",
      },    
      {
        createrENS: "ikuzou.eth",
        squareId: 1033,
        backendSquareId: 500,
        description: "temporary",
        nftURL: "https://i.seadn.io/gae/29dLZ98xEbYSUSindSEBzuWGCxyWvAutR7Kb9bPziI5RWCfqtpLrLDWkaAe6I3KyDsWkP2wSwnPErMaD9dF3hUzzHy79RJvaGvET?w=500&auto=format",
        squareBalance: 200,
        IsBalanceAdd: false,
        questContractAddress: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
        questDescription: "buy ETH",
        createrIcon: "temporary",
      },
      {
        createrENS: "tanaka.eth",
        squareId: 2040,
        backendSquareId: 1033,
        description: "temporary",
        nftURL: "https://i.seadn.io/gae/29dLZ98xEbYSUSindSEBzuWGCxyWvAutR7Kb9bPziI5RWCfqtpLrLDWkaAe6I3KyDsWkP2wSwnPErMaD9dF3hUzzHy79RJvaGvET?w=500&auto=format",
        squareBalance: 10,
        IsBalanceAdd: false,
        questContractAddress: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
        questDescription: "buy monacoin",
        createrIcon: "temporary",
      },
      {
        createrENS: "tanaka.eth",
        squareId: 1000,
        backendSquareId: 2040,
        description: "temporary",
        nftURL: "https://i.seadn.io/gae/29dLZ98xEbYSUSindSEBzuWGCxyWvAutR7Kb9bPziI5RWCfqtpLrLDWkaAe6I3KyDsWkP2wSwnPErMaD9dF3hUzzHy79RJvaGvET?w=500&auto=format",
        squareBalance: 10,
        IsBalanceAdd: false,
        questContractAddress: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
        questDescription: "buy monacoin",
        createrIcon: "temporary",
      },
      {
        createrENS: "tanaka.eth",
        squareId: 1200,
        backendSquareId: 1000,
        description: "temporary",
        nftURL: "https://i.seadn.io/gae/29dLZ98xEbYSUSindSEBzuWGCxyWvAutR7Kb9bPziI5RWCfqtpLrLDWkaAe6I3KyDsWkP2wSwnPErMaD9dF3hUzzHy79RJvaGvET?w=500&auto=format",
        squareBalance: 10,
        IsBalanceAdd: false,
        questContractAddress: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
        questDescription: "buy monacoin",
        createrIcon: "temporary",
      },
    ]
      
    let txn;
  
    for(const squareParams of squaresToCreate) {
      txn = await foteisonGame.createSquare(
        squareParams.createrENS,
        squareParams.squareId,
        squareParams.backendSquareId,
        squareParams.description,
        squareParams.nftURL,
        squareParams.squareBalance,
        squareParams.IsBalanceAdd,
        squareParams.questContractAddress,
        squareParams.questDescription,
        squareParams.createrIcon,
      );
      await txn.wait();
  };

    // const getSquare = await foteisonGame.getSquare(1275);
    // console.log(getSquare.adjacentSquareIds.length);

    const userMoveTxn = await foteisonGame.moveUser(6, 1275);
    console.log(userMoveTxn);

    const user = await foteisonGame.confirmUser();
    console.log(user);

}

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