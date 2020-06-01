import React from 'react';
import {Smiley} from '../Smiley/Smiley';
import {Mood} from '../Mood/Mood';
import {Button} from '../Button/Button';
import hobby from '../../assets/images/hobby.png';
import other from '../../assets/images/other.png';
import relationships from '../../assets/images/relationships.png';
import travel from '../../assets/images/travel.png';
import work from '../../assets/images/work.png';
import training from '../../assets/images/training.png';
import './HappyMeter.css';

export class HappyMeter extends React.Component {
  constructor() {
    super();
    this.state = {
      mood: 3,
      clickedSave: false,
      answeredToday: false
    }
    this.setMood = this.setMood.bind(this); 
    this.deleteMood = this.deleteMood.bind(this); 
  }

  componentDidMount() {
    this.checkIfAnswered(); //If already answered, show message about this
  }

  checkIfAnswered() {
    fetch(`/api/exist`)
      .then(res => res.json())
      .then(res => { res.result === null ? 
        this.setState({ answeredToday: false }) : this.setState({ answeredToday: true }) 
      })
  }

  cancel = prop => this.props.history.push('/') 

  sliderOnChange(mood) { //Update mood state with slider value
      const value = mood.target.value
      this.setState({ mood: value })
  }

  deleteMood() { 
    fetch('/api/delete')
      .then(this.setState({ answeredToday: false, clickedSave: false }))
  }
      
  setMood() { this.setState({ clickedSave: true }) } 

  save = (reason) => { 
    const theReason = reason.target.id;
    const mood = this.state.mood;
    fetch(`/api/new?reason=${theReason}&mood=${mood}`)
      .then(this.props.history.push('/'))
  }

  render () {
    if (!this.state.clickedSave && !this.state.answeredToday) {
      return (
        <>
          <div className="happyMeter">
            <span className="whiteAndFat">How happy do you feel today?</span>
            <span className="faces">
              <Smiley 
                size="large"
                className="smiley-padding" 
                smiley={this.state.mood} />
            </span>
            <Mood className="faceTitle" smiley={this.state.mood} />
            <input 
              className="slider" 
              type="range" 
              min="1" 
              max="5" 
              step="1"
              defaultValue={this.state.value}
              onChange={mood => this.sliderOnChange(mood)}
            />
          </div>
          <Button 
            className="btn-medium btn-bigMargin" 
            title="Save" 
            onClick={this.setMood}
          />
        </>
      )
    } 
  
    if (this.state.clickedSave && !this.state.answeredToday) {
      return(
        <>
          <div className="happyMeter">
            <span className="whiteAndFat">What is the biggest reason for feeling as you do?</span>
            <div className="reasonContainer">
              <div className="reason">
                <img id="relations" alt="" className="reasonImg" src={relationships} onClick={this.save}/>
                Relations
              </div>
              <div className="reason">
                <img id="work" alt="" className="reasonImg" src={work} onClick={this.save}/>
                Work
              </div>
              <div className="reason">
                <img id="exercise" alt="" className="reasonImg" src={training} onClick={this.save}/>
                Exercise
              </div>
              <div className="reason">
                <img id="hobby" alt="" className="reasonImg" src={hobby} onClick={this.save}/>
                Hobby
              </div>
              <div className="reason">
                <img id="travel" alt="" className="reasonImg" src={travel} onClick={this.save}/>
                Travel
              </div>
              <div className="reason">
                <img id="other" alt="" className="reasonImg" src={other} onClick={this.save}/>
                Other
              </div>
            </div>
          </div>
        </>
      )
    } 
    
    else {
      return(
        <>
          <div className="window">
            <Button className="btn-round" title="x" onClick={this.cancel}/>
            <div className="happyMeter">
              <span className="whiteAndFat">You have already answered today.</span>
              <p>
              <Button 
              className="btn-medium btn-smallMargin" 
              title="Change mood" 
              onClick={this.deleteMood} />
              </p>
            </div>
          </div>
        </>
      )

    } 

};

}