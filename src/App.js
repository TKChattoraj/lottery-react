import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { manager: "" };
  // }
  // With ES2016 [?], the a seeming setting of a variable, 'state,' in the case
  //  below, can be thought of as being executed within the constructor method, which
  //  apparently doesn't need to be explicitely called.
  //  It's this type of syntaxtic sugar that makes things confusing.  Why not
  //  just do it the old fashion way?  Is the savings really that great?

  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager: manager, players: players, balance: balance });
  }

  //  with the below format of defining onSubmit, we might need to be aware of binding onSubmit to 'this' in the render function
  //  but with the format being used, 'this' is autmatically defined as the component

  // onSubmit() {
  //
  // }

  //event is the form submition object

  onSubmit = async event => {
    event.preventDefault(); //to prevent form submition in the normal html way--whatever that means

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });
    this.setState({ message: "You have been entered" });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This Contract is managed by {this.state.manager}. There are currently{" "}
          {this.state.players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
