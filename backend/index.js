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

// get NFTs from ethereum and polygon
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
  
  app.get("/confirmTransaction", async (req, res) => {
    try {
      const response = await Moralis.EvmApi.transaction.getTransaction({
        chain: "0x5",
        transactionHash: "0x7b6b73d83c2fbd8185b211e08edc442c53158c50da23499bbcb402906cede720",
    });

    res.send(response.raw.logs[0].address);
    } catch (e) {
      res.send(e);
    }
  });
  
  
  
  
  
  