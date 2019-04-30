import Web3 from 'web3';



const getProvider = async () => {
  await window.web3.currentProvider.enable();  //request authentication
};
getProvider();

//'window.web3' is the web3 version that Metamask uses for the window
//that web3 instance is different from the web3 instance we create below
const web3 = new Web3(window.web3.currentProvider);

export default web3;
