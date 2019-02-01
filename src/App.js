import React, { Component } from 'react';
import BallotList from './components/BallotList'
import WinnerModal from './components/WinnerModal'
import logo from './raffle.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      ballot:[],
      losers: [],
      winner: 0
    }
  }

  componentWillMount(){
    this.initBallot();
  }

  componentDidUpdate(){
    if (this.state.ballot.length === 1){
      const winner = this.state.ballot[0];
      this.setState( state => {
        return {
          ballot : [],
          winner : winner,
        }
      });
    }
  }

  initBallot(){
    this.setState( state => {
      return {ballot: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]}
    })
  }

  resetBallot = (event) => {
    event.preventDefault();
    this.setState( state => {
      return {
        ballot : ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
        losers : [],
        winner : 0
      }
    });
  }

  handleButtonClick = () =>{

    if (this.state.winner === 0){
      const newLosers = this.state.losers;
      const newBallot = this.state.ballot;
      const newLoser = newBallot.splice(Math.floor(Math.random()*newBallot.length), 1);

      newLosers.push(newLoser[0]);

      this.setState({ballot: newBallot});
      this.setState({losers: newLosers});
    }
  }

  render() {

    let isVisible = false;
    if( this.state.winner !== 0){
      isVisible = true;
    }

    return (
      <div className="App">

      <div className="row">
      <div className="col lista">
          <BallotList ballot={this.state.ballot} header="Aún con vida..." />
      </div>
      <div className="col">
        <header className="App-header">

          {this.state.winner > 0 ? <WinnerModal winner={this.state.winner} /> : 
            <div>
              <img src={logo} className="App-logo" alt="logo" onClick={this.handleButtonClick}/>
              <p>
                Haga click en la <a href="https://www.onlinewebfonts.com/icon/562679" target="_blank">
                tómbola</a> para sacar números
              </p>
            </div>
          }
   
          { this.state.losers.length > 0 ? 
            <button
              onClick={this.resetBallot}
            >
              Reiniciar
            </button> : null }
          
        </header>
        </div>
        <div className="col lista">
          <BallotList ballot={this.state.losers} header="Descartados:" />
        </div>
        </div>
      </div>
    );
  }
}

export default App;
