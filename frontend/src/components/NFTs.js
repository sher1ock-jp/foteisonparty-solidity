import React from "react";
import axios from "axios";
import { useEffect } from "react";

function Nfts({ _allNfts, _setAllNfts, _profileIconNft, _setProfileIconNft, _IsProfileNft, _setIsProfileNft, _currentAccount }) {

    async function getNFTs() {

        const response = await axios.get("http://localhost:8080/nftBalance", {
            params: {
                address: _currentAccount,
                chain: "0x89", // Mumbai
            },
        });
        
        // console.log(JSON.parse(response.data[0].metadata).image);

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
            _setAllNfts(t);
          }
        }

    useEffect(() => {
        if(! _IsProfileNft)
        getNFTs();
    }, []);

      // when user click the NFT, display the NFT
     const selectNFT = (nft) => {
        _setProfileIconNft(nft);
        _setIsProfileNft(true);
    };

    // when user click the button of changeNFT, display the NFTs again
    const changeNFT = () => {
      _setIsProfileNft(false);
    };
    
    return (
        <>
          {! _IsProfileNft && (
            <>
              <div className="nft-zone">
                {_allNfts &&
                  _allNfts.map((nft, index) => (
                    <div className="nft-item" key={index} onClick={() => selectNFT(nft)}>
                      <img className="nft-image" src={nft.image} width={50} alt="" />
                    </div>
                  ))}
              </div>
            </>
          )}
          { _IsProfileNft && (
            <div className="nft-zone">
                {_profileIconNft && (
                    <>
                      <div className="nft-item">
                        <img src={_profileIconNft.image} width={70} alt="" /> 
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