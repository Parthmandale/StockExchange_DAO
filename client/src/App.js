import { useState, useEffect } from "react";
import Web3 from "web3";
import DAO from "./contracts/DAO.json";
import "./App.css";
import Investors from "./components/Investors/Investors";
import Manager from "./components/Manager/Manager";

function App() {
  const [state, setState] = useState({ web3: null, contract: null });  //use state to store and update initial value

  const [account, setAccount] = useState("Not connected");   // initial account not set
  const [balance, setBalance] = useState(0)                    // balance initial 0
  useEffect(() => {                                          // this useEffect for setting up all the things, as dependency array is empty it will only work once when program start
    async function init() {
      const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"); // CONNECTING TO GANACHE
      const web3 = new Web3(provider);                                           //assigning web3 a value to store in useState              
      const networkId = await web3.eth.net.getId();    // getting the accounss fetch from Ganache
      const deployedNetwork = DAO.networks[networkId]; //  
      const contract = new web3.eth.Contract(DAO.abi, deployedNetwork.address);    // Contract Instance

      setState({ web3: web3, contract: contract });          // assigning the useSate the the final value after assinging them above
    }
    init();                                                  // fun call
  }, []);                                                    // deependencies

  useEffect(() => {             // this useEffect because we want to fetch the the the accounts, their bal, 
    const { web3 } = state;     // destructuring 
    const allAccounts = async () => {           // fun is called only when the select account idis betting used
      var select = document.getElementById("selectNumber");
      var options = await web3.eth.getAccounts(); // storing all account in it

      for (var i = 0; i < options.length; i++) { // for loop to display all the account
        var opt = options[i];                     // all account is getting stored one by one  
        var el = document.createElement("option");  // elem creted
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);  // edit the child
      }
    };
    web3 && allAccounts();    // only work if this is web3 is true and them allAccount fun is being called
  }, [state]);

  const selectAccount = async () => {          // function for fetching only the value of accounts anothing else than that
    let selectedAccountAddress = document.getElementById("selectNumber").value;
    if (selectedAccountAddress && selectedAccountAddress !== "Choose an account") {
      setAccount(selectedAccountAddress);     // account is being selected here so account has a value
    }
  };
  //code for account balance

  useEffect(() => {
    const { web3 } = state; //destructuring
    const getBalance = async () => {
      if (account !== "Not connected") {
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether")
        setBalance(balanceEth);
      }
    }
    web3 && getBalance();
  }, [state, account]);     // this useEffect func is called when stae or account is geeting changer or call on the frontend



  return (

    <div className="App">
      <h1>Decentralize Autonoumous Organization</h1>
      <p className="font">Connected Account: {account}</p>
      <p className="font">Available Funds: {balance} ETH</p>
      <form className="label0" id="myForm">
        <label htmlFor=""></label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option align="center">Choose an account</option>
        </select>
      </form>
      <p className="font">For Manager</p>
      <Manager state={state} account={account}></Manager>
      <p className="font">For Investors</p>
      <Investors state={state} account={account}></Investors>

    </div>
  );
}
export default App;