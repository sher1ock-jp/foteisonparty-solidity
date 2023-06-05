// wallet connect
// change the network to Mumbai Testnet
// if wallet is not connected, display wallet connect button

import React, { useEffect } from "react";
import ProfileScreen from "./ProfileScreen";

const WalletConnect = ({ currentAccount, setCurrentAccount, Profile, setProfile, ENS, setENS  }) => {
  // manage state of the wallet
  // const [currentAccount, setCurrentAccount] = useState(null);
  // const [Profile, setProfile] = useState(null);

  // confirm that the user has MetaMask installed
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
        // store the user's address if they have MetaMask
        const accounts = await ethereum.request({ method: "eth_accounts" });
      
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // if wallet is connected, display user's profile
  
  const renderProfile = () => {
    if(!currentAccount) {
      return (
        <div className="wallet-container">
          <button className="wallet-button" onClick={connectWalletActionn}>WalletConnect</button>
        </div>  
      );
    }else if(currentAccount && !Profile) {
      return <ProfileScreen 
        setProfile={setProfile} 
        ENS={ENS}
        setENS={setENS}  
        />
    }
  };


  const connectWalletActionn = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]);
  }catch (error) {
    console.log(error);
  }
};

  // ページがロードされたときに useEffect()内の関数が呼び出されます。
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

 
  return (
    <div className="wallet-container">
      {renderProfile()}
    </div>  
  );
};

export default WalletConnect;