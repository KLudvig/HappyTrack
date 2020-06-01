import React from 'react';
import {Button} from '../Button/Button';
import {LineChart} from './LineChart/LineChart';
import './Stats.css';


export class Stats extends React.Component {
  constructor() {
    super();
    this.state = {
      period: 'week',
    }
  }

  period = period => this.setState({period: period}); //set period onClick

  addMood = prop => this.props.history.push('/add'); //change route onClick

  render() {
    return (
      <>
        <div className="statsContainer">
            <span className="averageMood">AVERAGE MOOD</span>
        <LineChart period={this.state.period} />
        </div>
        <div className="statsSettings">
          <span className="settingsTitle"> Settings</span>
          <Button 
            className="btn-small btn-grey" 
            title="Week" 
            onClick={() => this.period('week')}
          />
          <Button 
            className="btn-small btn-grey" 
            title="Month" 
            onClick={() => this.period('month')}
          />
          <Button 
            className="btn-small btn-grey" 
            title="Year" 
            onClick={() => this.period('year')}
          />
        </div>
        <div className="statsBottom">
          <Button 
            className="btn-medium btn-green" 
            title="Add Mood" 
            onClick={this.addMood}
          />
        </div>
      </>
    );
  };
}