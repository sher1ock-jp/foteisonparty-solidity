// 1.get ENS name from address
// 2.get NFTs from address
// if user do the designated transaction, confirm the transaction and update the status of the quest, andd enble the user to roll the dice

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
    // await Moralis.start({ apiKey : process.env.MORALIS_API_KEY });

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

app.get("/nftBalance", async (req, res) => {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  
    try {
      const { address, chain } = req.query;
  
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address: address,
        chain:  chain,
      });
  
      const userNFTs = response.toJSON();
  
      res.send(userNFTs.result);
    } catch (e) {
      res.send(e);
    }
  });