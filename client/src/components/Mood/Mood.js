import React from 'react';

export class Mood extends React.Component {

   render () {
      if(this.props.smiley == 1) {
         return <span className={this.props.className}>SUPER BAD</span>
      }

      if(this.props.smiley == 2) {
         return <span className={this.props.className}>NOT HAPPY</span>
      }

      if(this.props.smiley == 3) {
         return <span className={this.props.className}>OK</span>
      }

      if(this.props.smiley == 4) {
         return <span className={this.props.className}>HAPPY</span>
      }

      if(this.props.smiley == 5) {
         return <span className={this.props.className}>SUPER AWESOME</span>
      }
   }
}