const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 8080;

app.use(cors());

Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});

app.get('/UserENS', async (req, res) => {

    try{

        const { address } = req.query;
  
        const response = await Moralis.EvmApi.resolve.resolveAddress({
            address: address,
        });
           
        const ENS = response.toJSON();

        res.send(ENS);
    }catch(e){
        res.send(e);
    } 
});

// get NFTs that belong to the user
app.get("/nftBalance", async (req, res) => {
    try {
      const { address, chain } = req.query;
    
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address: address,
        chain: chain,
      });
    
      const userNFTs = response.toJSON();
    
      res.send(userNFTs.result);
    } catch (e) {
      res.send(e);
    }
  });

app.get("/confirmContract", async (req, res) => {
  try {

    const { address, chain } = req.query;

    const response = await Moralis.EvmApi.events.getContractLogs({
      address: address,
      chain: chain,
    });

    const contractLogs = response.toJSON();

    res.send(contractLogs);
  } catch (e) {
    res.send(e);
  }
});

app.get("/confirmTransaction", async (req, res) => {

  const { transactionHash } = req.query;

  try {
    const response = await Moralis.EvmApi.transaction.getTransaction({
      chain: "0x5",
      transactionHash: transactionHash,
  });

  res.send(response.raw.logs[0].address);
  } catch (e) {
    res.send(e);
  }
});
  
  
  
  
  
  