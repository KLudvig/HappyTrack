import React, { Component } from 'react';
import Chart from "chart.js";
import moment from 'moment';
import {Smiley} from '../../Smiley/Smiley';
import {Mood} from '../../Mood/Mood';
import './LineChart.css';

export class LineChart extends Component {

    constructor() {
        super();
        this.state = {
        mood: 5,
        }
    }

    componentDidUpdate() { 
        this.getChartData();
    }

    componentDidMount() {
        this.getChartData();
    }

    getChartData() {
    fetch(`api/getData/${this.props.period}`)
        .then(resp => resp.json())
        .then(resp => {
            const dataIterable = Object.entries(resp);
            const data = dataIterable[0][1]
            
            //Arrays for holding chart data.
            const labels = [];
            const dateNow = data.dateNow.sort((a, b) => a.date - b.date); //Sorting by date for easier error check
            const now = [];
            const datePast = data.datePast.sort((a, b) => a.date - b.date);
            const past = [];

            //If statements to change chart data based on period (week, month, year)
            if ( this.props.period === 'week' ) {
                //Now
                for(let i=0; i < 7; i++) {
                    let day = moment().subtract([i], 'days').format("YYYYMMDD");
                    let findDay = dateNow.find(obj => obj.date == day); //Find each weekday and push to array for use with chart.js, if not exist then push null
                    
                    findDay != undefined ? now.push(findDay.mood) : now.push(null);
                    labels.push(moment().subtract([i], 'days').format("dd")); //Push labels. "dd" is first two letters of the day
                }
                //Past
                for(let i=0; i < 7; i++) {
                    let pastDay = moment().subtract([i+7], 'days').format("YYYYMMDD");
                    let findDay = datePast.find(obj => obj.date == pastDay);
                    
                    findDay != undefined ? past.push(findDay.mood) : past.push(null);
                }
                //Reverse arrays to display correctly
                now.reverse();
                past.reverse();
                labels.reverse();

                this.renderChart(now, past, labels);
            }

            if ( this.props.period === 'month' ) {
                //Now
                for(let i=0; i < 30; i++) { //Find each day in month and push to array for use with chart.js, if not exist then push null
                    let day = moment().subtract([i], 'days').format("YYYYMMDD");
                    let findDay = dateNow.find(obj => obj.date == day); 

                    findDay != undefined ? now.push(findDay.mood) : now.push(null)
                    moment().subtract([i], 'days').format("dd") == "Mo" ? labels.push("Week") : labels.push(""); //Push label "week" on every monday
                }
                //Then
                for(let i=0; i < 30; i++) { 
                    let day = moment().subtract([i+30], 'days').format("YYYYMMDD");
                    let findDay = datePast.find(obj => obj.date == day); 
                    
                    findDay != undefined ? past.push(findDay.mood) : past.push(null);
                }

                now.reverse();
                past.reverse();
                labels.reverse();

                this.renderChart(now, past, labels);
            }

            if ( this.props.period === 'year' ) {
                //Now
                for(let i = 0; i < 12; i++) { //Filter all objects with same month to same array
                    const month = dateNow.filter(obj => 
                        obj.date >= moment().startOf('month').subtract([i], 'months').format("YYYYMMDD") && 
                        obj.date <= moment().endOf('month').subtract([i], 'months').format("YYYYMMDD")); 
                    const average = Math.round(month.reduce((total, {mood}) => total + mood, 0) / month.length); //Calculate the average and round to nearest integer
                    
                    isNaN(average) ? now.push(null) : now.push(average); //Push each months average to use with chart.js. If no objects in month then push null.
                    labels.push(moment().startOf('month').subtract([i], 'months').format("MMM")); //Push labels. 'MMM' is first three letters of the month
                }
                //Past
                for(let i = 0; i < 12; i++) {
                    const month = datePast.filter(obj => 
                        obj.date >= moment().startOf('month').subtract([i+12], 'months').format("YYYYMMDD") && 
                        obj.date <= moment().endOf('month').subtract([i+12], 'months').format("YYYYMMDD")); 
                    const average = Math.round(month.reduce((total, {mood}) => total + mood, 0) / month.length); 

                    isNaN(average) ? past.push(null) : past.push(average);
                }

                now.reverse();
                past.reverse();
                labels.reverse();

                this.renderChart(now, past, labels);
            }

            //If nothing is in mongoDB, then don't change mood, otherwise set mood state
            if(data.dateNow.length != 0 || data.datePast.length != 0) {
                const filtArray = now.filter(num => num != null); 
                const avgMood = Math.round(filtArray.reduce( (total, current) => total + current) / filtArray.length);

                if ( avgMood !== this.state.mood ) { //Because setState creates an update, and this is inside componentDidUpdate, this check is done to prevent a forever loop.
                    this.setState({ mood: avgMood });
                }
            }

        })
    }

    renderChart(now, past, labels) {
        Chart.defaults.global.defaultFontStyle = '600';
        const ctx = document.getElementById("myChart").getContext("2d");
        
        if(window.bar != undefined)  {
            window.bar.destroy(); 
        }

        window.bar = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Mood ",
                        data: now,
                        borderColor: '#ffffff',
                        fill: false,
                        borderWidth: 4.5,
                        pointRadius: 10,
                        pointHoverRadius: 10,
                        pointBorderWidth: 20,
                        pointBorderColor: 'transparent'
                    },
                    {
                        label: "",
                        data: past,
                        borderColor: '#318d96',
                        fill: false,
                        borderWidth: 4.5,
                        pointRadius: 0,
                        pointHoverRadius: 0
                    },
                ]
            },
            options: {
                elements: {
                    point:{
                        radius: 1,
                        pointStyle: 'line'
                    }
                },
                tooltips: {
                    backgroundColor: '#ffffff',
                    titleFontColor: '#333333',
                    bodyFontColor: '#333333'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: true,
                            fontColor: "#318d96",
                            fontWeight: "bold",
                            autoSkip: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false,
                            max: 5.5,
                            min: 0.5
                        }
                    }]
                },
                responsive: true
            }
        });
    };

    render() {
        return (
            <>
                <Smiley 
                    size="medium" 
                    className="smiley-position" 
                    smiley={this.state.mood} 
                />
                <Mood className="faceTitleStats" smiley={this.state.mood} />
                <canvas id="myChart" height="270px" />
            </>
        )
    };
}