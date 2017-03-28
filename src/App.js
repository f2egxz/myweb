import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    HashRouter  as Router,
    Route,
    NavLink,
    Redirect
} from 'react-router-dom'
import Chart from './d3/chart.js'
import Games from './games.js'


class App extends Component {
  constructor(){
      super();
      this.state = {}
  }
  render() {
    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to GXZ space</h2>
                </div>
                <p className="App-intro">
                    <NavLink to="/chart" activeClassName="active"> 图表</NavLink>
                    <NavLink to="/game" activeClassName="active"> 小游戏</NavLink>
                </p>
                    <Redirect to="/chart"/>
                    <Route path="/chart" component={Chart}/>
                    <Route path="/game" component={Games}/>
            </div>
        </Router>
    );


  }
}
export default App;
