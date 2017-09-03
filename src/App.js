import React, { Component } from 'react';
import DataFetcher from "./DataFetcher.js";
import SelectDisplay from "./components/SelectDisplay.js";
import CampaignsDisplay from "./components/CampaignsDisplay.js";
import StatCardContainer from "./components/StatCardContainer.js";
import Hamburger from "./assets/hamburger.png";
import Refresh from "./assets/refresh.png";
import './App.css';
import 'normalize.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


const SelectMakes = DataFetcher("/makes", SelectDisplay);
const SelectModels = DataFetcher("/car-models", SelectDisplay);
const WrappedCampaignsDisplay = DataFetcher("/campaigns", CampaignsDisplay);

const RouteSelectMakes = ({history, match: {params: {makeId}}}) => (
  <SelectMakes onChange={(e) => history.replace(`/${e.target.value}`)} 
                value={makeId}/>
)


const RouteSelectModels = ({history, match: {params: {carModelId, makeId}}}) => (
  <SelectModels onChange={(e) => history.replace(`/${makeId}/${e.target.value}`)}
                value={carModelId} 
                params={{make_id: makeId}}/>
)

const RouteCampaign = ({match: {params: {carModelId}}}) => (
  <div>
    <h2>Overall Stats</h2>
    <StatCardContainer/>
    <WrappedCampaignsDisplay params={{car_model_id: carModelId}}
                            value={carModelId}/>
  </div>
)



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="nav-bar">
            <div className="container">
              <div className="menu-wrapper">
                <img alt="menu" className="menu" src={Hamburger}/>
              </div>
              <h1 className="logo">Logo</h1>
            </div>
          </nav>
          <div className="control-bar">
            <div className="container clearfix">
              <div className="pull-left">
                <Route path="/:makeId?" 
                       component={RouteSelectMakes}/>
                <Route path="/:makeId/:carModelId?" 
                       component={RouteSelectModels}/>
              </div>
             <div className="pull-right">
              <label htmlFor="periodTo">Period</label>
              <input placeholder="01-04-2017" className="small" id="periodTo" name="periodTo"/>
              <input placeholder="30-06-2017" className="small" name="periodFrom" />
              <img alt="refresh" className="refresh" src={Refresh}/>
              
             </div>
            </div>
          </div>
          <div className="container">
            <Route path="/:makeId/:carModelId" component={RouteCampaign}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
