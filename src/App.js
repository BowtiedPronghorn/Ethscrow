import './index.css'

import Wrapper from './components/Wrapper'
import ConnectWallet from './components/ConnectWallet'

import React, { useEffect, useState } from "react";
import MakeTransaction from "./components/MakeTransaction";
import ExecuteTransaction from "./components/ExecuteTransaction";
import contract from './contracts/Escrow.json';
import { ethers } from 'ethers';
import GetTxnId from "./components/GetTxnId";

const contractAddress =  "0xDB32fAd3d0e68B3Da9032729834fb089e17f4632" //Ropsten
const abi = contract.abi;

var value = 1; // Keeps track of whether wallet is connected or not
const InitTxn_Initial = "Initialise Transaction";
const ExecTxn_Initial = "Execute Transaction";

function App() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [walletButtonText, setWalletButtonText] = useState("Connect Wallet");
    const [currTxnId, setTxnId] = useState("Unknown");
    const [InitTxn, setInitTxn] = useState(InitTxn_Initial);
    const [ExecTxn, setExecTxn] = useState(ExecTxn_Initial);

    const walletClick = async () => {
        value = value * -1;

        if (value == 1) {
            setWalletButtonText("Connect Wallet");
        }
        else {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            let currAddress = await signer.getAddress()

            console.log("Found an ethereum account, address: ", currAddress);
            setCurrentAccount(currAddress);
            setWalletButtonText(currAddress.substring(0, 7)+"..."+currAddress.substr(-7));
        }
    }

    const TxnIdClick = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                if (value == -1) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const escrowContract = new ethers.Contract(contractAddress, abi, signer);

                    console.log("Attempting test transaction");
                    let txnId = await escrowContract.txnId();
                    setTxnId(String(txnId));
                }
                else {setTxnId("Unknown")}
            }
        }
        catch (e) {
            console.log("Caught an error while handling TxnIdClick")
            console.log(String(e));
        }
    }

    const InitTxnClick = async () => {
        setInitTxn("Processing...");

        try {
            const { ethereum } = window;

            if (ethereum) {
                if (value == -1) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const escrowContract = new ethers.Contract(contractAddress, abi, signer);

                    console.log("Creating New Transaction");
                    let manager = String(document.getElementById("Manager").value);
                    let recipient = String(document.getElementById("Recipient").value);
                    let amount = String(document.getElementById("Amount").value);
                    amount = ethers.utils.parseEther(amount); //Convert ether input to wei

                    await escrowContract.createTransaction(manager,recipient, {value: amount});
                    console.log("Done");
                    setInitTxn("Complete");
                }
                else {setInitTxn(InitTxn_Initial);}
            }
        }
        catch (e) {
            console.log("Caught an error while handling CreateTxn")
            console.log(String(e));
            setInitTxn("Something Went Wrong");
        }
    }

    const ExecTxnClick = async () => {
        setExecTxn("Processing...");

        try {
            const { ethereum } = window;

            if (ethereum) {
                if (value == -1) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const escrowContract = new ethers.Contract(contractAddress, abi, signer);

                    console.log("Executing Transaction");
                    let forTransaction = String(document.getElementById("TransactionId").value);
                    let isExecuted = document.getElementById("ExecTrue").checked;
                    console.log(isExecuted);
                    await escrowContract.executeTransaction(forTransaction, isExecuted);

                    console.log("Done");
                    setExecTxn("Complete");
                }
                else {setExecTxn(ExecTxn_Initial);}
            }
        }
        catch (e) {
            console.log("Caught an error while handling ExecuteTxn")
            console.log(String(e));
            setExecTxn("Something Went Wrong");
        }
    }

  return (
      <Wrapper>
          <ConnectWallet value={walletButtonText} onClick={walletClick}>
          </ConnectWallet>
          <MakeTransaction value={InitTxn} onClick={InitTxnClick}>
          </MakeTransaction>
          <ExecuteTransaction value={ExecTxn} onClick={ExecTxnClick}>
          </ExecuteTransaction>
          <GetTxnId value={currTxnId} onClick={TxnIdClick}>
          </GetTxnId>
      </Wrapper>
  );
}

export default App;
