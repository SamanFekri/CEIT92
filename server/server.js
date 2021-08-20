import express from 'express'
import mongoose from 'mongoose'

const app = express()

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true});

let Articles = require('./models/article')
let Students = require('./models/student')
let Users = require('./models/user')

//we need this obe if we send data inside the body as JSON
app.use(express.json())

app.get('/students', async (req, res) => {
  let result = await Students.find({user_id: {$exists: true}});
  res.json(result);
})

app.get('/student/articles/:id', async (req, res) => {
  let id = req.params.id;
  let result = await Articles
    .find({texter_id: req.params.id/*, show: "true"*/, title: {$ne: "کلمه برای کاور"}})
    .populate('user_id');
  res.json(result);
})

app.get('/student/:id', async (req, res) => {
  let result = await Students.findOne({username: req.params.id});
  if(!result) {
    res.json({msg: 'Student not found'});
    return
  }
  res.json(result);
})

//////////////////////////////////
// restore the missing database
app.get('/finder/articles/:index', async (req, res) => {
  try {
    req.params.index = parseInt(req.params.index)
  }catch (e) {
    console.log(e)
    return
  }
  if(req.params.index < 0) {
    res.json({msg: 'not in article range'});
    return
  }
  let result = await Articles.aggregate([
    {$group: {_id: {texter_id: "$texter_id"}}},
    {$sort: { _id: -1 } },
  ]);
  if(req.params.index >= result.length) {
    res.json({msg: 'not in article range'});
    return
  }
  let next = result.length <= req.params.index + 1 ? -1 : req.params.index + 1;
  let prev = 0 <= req.params.index - 1 ? req.params.index - 1 : -1;
  let resp = {
    texter_id:result[req.params.index]._id.texter_id,
    next: next,
    prev: prev
  }
  res.json(resp);
})

app.get('/student/texter/:id', async (req, res) => {
  let result = await Students.findOne({user_id: req.params.id});
  if(!result) {
    res.json({});
    return
  }
  res.json(result);
})

app.get('/students/all', async (req, res) => {
  let result = await Students.find({});
  res.json(result);
})

app.get('/assign/:texter_id/:student_id', async (req, res) => {
  let student = await Students.findById(req.params.student_id);
  student.user_id = req.params.texter_id;
  let user = new Users({
    _id: student.user_id,
    name: `${student.first_name} ${student.last_name}`
  })
  await user.save();
  await student.save();
  res.json({student, user});
})
///////////////////////////////////

export default app
