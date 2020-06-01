import React from 'react';
import smiley1 from '../../assets/images/smiley1.png';
import smiley2 from '../../assets/images/smiley2.png';
import smiley3 from '../../assets/images/smiley3.png';
import smiley4 from '../../assets/images/smiley4.png';
import smiley5 from '../../assets/images/smiley5.png';
import './Smiley.css';

export class Smiley extends React.Component {

   render () {
      if(this.props.smiley == 1) {
         return <img className={`smiley-${this.props.size} ${this.props.className}`} src={smiley1}/>
      }

      if(this.props.smiley == 2) {
         return <img className={`smiley-${this.props.size} ${this.props.className}`} src={smiley2}/>
      }

      if(this.props.smiley == 3) {
         return <img className={`smiley-${this.props.size} ${this.props.className}`} src={smiley3}/>
      }

      if(this.props.smiley == 4) {
         return <img className={`smiley-${this.props.size} ${this.props.className}`} src={smiley4}/>
      }

      if(this.props.smiley == 5) {
         return <img className={`smiley-${this.props.size} ${this.props.className}`} src={smiley5}/>
      }
   }
}