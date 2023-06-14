// get my NFTs and chose for my icon and square
// Concerning my icon, when I chose my icon's button in the profile, display my NFTs and let me chose one of them as my icon
// if my icon is not set, display the default icon
// Concering the NFT of square, when the square is created, write the data to the blockchain with the other data of the square

import React from "react";
import axios from "axios";
import { useEffect } from "react";

function Nfts({ _nfts, _setNFTs, _NFTList, _setNFTList, _showNFT, _setShowNFT }) {

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
            _setNFTs(t);
          }
        }

    useEffect(() => {
        console.log("getNFTs called");
        if(! _showNFT)
        getNFTs();
    }, [ /* _showNFT, _setShowNFT */ ]);

      // when user click the NFT, display the NFT
     const selectNFT = (nft) => {
        _setNFTList(nft);
        _setShowNFT(true);
    };

    // when user click the button of changeNFT, display the NFTs again
    const changeNFT = () => {
        _setShowNFT(false);
    };
    
    return (
        <>
          {! _showNFT && (
            <>
              {/* <div className="profile-icon">Select your NFTicon</div> */}
              <div className="nft-zone">
                {_nfts &&
                  _nfts.map((nft, index) => (
                    <div className="nft-item" key={index} onClick={() => selectNFT(nft)}>
                      <img className="nft-image" src={nft.image} width={50} alt="" />
                    </div>
                  ))}
              </div>
            </>
          )}
          { _showNFT && (
            <div className="nft-zone">
                {_NFTList && (
                    <>
                      <div className="nft-item">
                        <img src={_NFTList.image} width={70} alt="" /> 
                        <button onClick={changeNFT}　className="nft-button">reset</button>
                      </div>
                    </>
                )}
            </div>
          )}
        </>
      );
}

export default Nfts;