import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './d3/chart.js'
import Games from './games.js'


class App extends Component {
  constructor(){
      super();
      this.state = {
          show: 'chart'
      }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <span className={this.state.show==='chart'?'active':''} onClick={this.showContent.bind(this)} data-show="chart">图表</span>
          <span className={this.state.show==='game'?'active':''} onClick={this.showContent.bind(this)} data-show="game">小游戏</span>
        </p>
          {this.state.show==='chart'?<Chart/> : <Games/>}
      </div>
    );
  }
  showContent(type){
      this.setState({
          show: type.target.dataset.show
      })
  }
}
export default App;
