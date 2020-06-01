const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const HappyTrack = require('./models/happyTrack');
const moment = require('moment');
require("dotenv").config();

//*** Connect to Database ***
const url = process.env.MONGO_DB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

//Check if database is connected
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('connection error:', err)
})


//*** Routes ***/

//Check if mood has already been set today
app.get('/api/exist', (req, res) => {
  async function findMood() {
    const today = Number(moment().format("YYYYMMDD"))
    const result = await HappyTrack.findOne({
    date: today
    }) 
  res.json({result});
  } 

  findMood(); 
});

//Save new mood
app.get('/api/new', (req, res) => {
  const today = Number(moment().format("YYYYMMDD"))
  const happyTrack = new HappyTrack({
    date: today,
    mood: req.query.mood,
    reason: req.query.reason
  });
  happyTrack.save()
  console.log('Mood saved!')
  res.end();
});

//Delete mood
app.get('/api/delete', (req, res) => {
  const today = Number(moment().format("YYYYMMDD"))
  HappyTrack.deleteOne({date: today})
    .then((result) => console.log('deleted saved mood with todays date: ' + today + ' from database'))
    .catch((err) => console.log(err))
  res.end();
});

//Get data based on period
app.get('/api/getData/:period', (req, res) => {
  const period = req.params.period;
  
  if (period === 'week') {
    const startDate = moment().subtract(6, 'days').format("YYYYMMDD")
    const endDate = moment().format("YYYYMMDD") 
    const pastStartDate = moment().subtract(13, 'days').format("YYYYMMDD")
    const pastEndDate = moment().subtract(7, 'days').format("YYYYMMDD") 

    async function getData() {
      const [dateNow, datePast] = await getDataWithDate(startDate, endDate, pastStartDate, pastEndDate)
      res.json([{dateNow: dateNow, datePast: datePast}])
    } 

    getData()
  }

  if (period === 'month') {
    const startDate = moment().startOf('month').format("YYYYMMDD")
    const endDate =  moment().endOf('month').format("YYYYMMDD")
    const pastStartDate = moment().startOf('month').subtract(1, 'months').format("YYYYMMDD")
    const pastEndDate = moment().endOf('month').subtract(1, 'months').format("YYYYMMDD")

    async function getData() {
      const [dateNow, datePast] = await getDataWithDate(startDate, endDate, pastStartDate, pastEndDate)
      res.json([{dateNow: dateNow, datePast: datePast}])
    } 

    getData()
  }

  if (period === 'year') {
    const startDate = moment().startOf('month').subtract(11, 'months').format("YYYYMMDD")
    const endDate = moment().endOf('month').format("YYYYMMDD")
    const pastStartDate = moment().startOf('month').subtract(23, 'months').format("YYYYMMDD")
    const pastEndDate = moment().endOf('month').subtract(12, 'months').format("YYYYMMDD")

    async function getData() {
      const [dateNow, datePast] = await getDataWithDate(startDate, endDate, pastStartDate, pastEndDate)
      res.json([{dateNow: dateNow, datePast: datePast}])
    } 

      getData()
  }

});


//*** Functions ***/

//Function for getting data from MongoDB between correct dates.
const getDataWithDate = async (startDate, endDate, pastStartDate, pastEndDate) => { 
  const dateNow = HappyTrack.find({
    date: {
      $gte: startDate, //Checks if greater or equal to
      $lte: endDate//Checks if less or equal to
    }
  })
  const datePast = HappyTrack.find({
    date: {
      $gte: pastStartDate, 
      $lte: pastEndDate
    }
  })
  
  const [dateN, DateP] = await Promise.all([dateNow, datePast])
  return ([dateN, DateP])
}


//*** Listen to port ***/
app.listen(port, () => console.log(`Listening on port ${port}`));