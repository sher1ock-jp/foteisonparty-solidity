// get my NFTs and chose for my icon and square
// Concerning my icon, when I chose my icon's button in the profile, display my NFTs and let me chose one of them as my icon
// if my icon is not set, display the default icon
// Concering the NFT of square, when the square is created, write the data to the blockchain with the other data of the square

import React from "react";
import axios from "axios";
import { useEffect } from "react";
// import { Reload } from "@web3uikit/icons";
// import { Input } from "@web3uikit/core"

function Nfts({ nfts, setNFTs, currentAccount }) {

    async function getNFTs() {

        const response = await axios.get("http://localhost:8080/nftBalance", {
            params: {
                address: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
                chain: "0x89",
            },
        });
        
        // data is an array of objects
        console.log(JSON.parse(response.data[0].metadata).image);

        if (response.data) {
            nftProcessing(response.data);
        }

        function nftProcessing(t) {
            console.log(t.length);
            for (let i = 0; i < t.length; i++) {
              let meta = JSON.parse(t[i].metadata);
              if (meta && meta.image) {
                if (meta.image.includes(".")) {
                  t[i].image = meta.image;
                } else {
                  t[i].image = "https://ipfs.moralis.io:2053/ipfs/" + meta.image;
                }
              }
            }
            setNFTs(t);
            console.log(t);
          }
        }

    useEffect(() => {
        getNFTs();
    }, []);
    
    return (
        <>
            <h1>NFTs</h1>
            <div className="tempo">gwakghwaighwapihgwaiophgwapohgapw
                <div>
                    {nfts &&
                        nfts.map((e) => {
                            return (
                                <>
                                    {e.image && <img src={e.image} width={200} />}
                                    <br />
                                </>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default Nfts;