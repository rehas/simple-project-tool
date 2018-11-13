const app = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect('mongodb://amsnow:amsnow1@ds261253.mlab.com:61253/mern-assesment-amsn', {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const {task} = require('./models/task.js')
const {section} = require('./models/section.js')

const Task = task
const Section = section

app.get('/tasks', async (req, res)=>{
  Task.find()
    .then(result=> {
      res.send(result)
    })
    .catch(err=> {
      res.send('error'+ err.code)
    })
})

app.get('/tasks/:taskid', async (req, res) =>{
  const {taskid} = req.params
  const task = await Task.findById(taskid).then(result=> result).catch(err=> console.log(err))
  res.send(task)
})

app.post('/tasks', async (req, res) =>{
  const {description, title, section} = req.body

  const task = new Task()
  if(description) task.description = description
  if(title) task.title = title
  if(section) task.section = section

  task.save().then(result=>res.send(result)).catch(err => console.log(err))
})

app.patch('/tasks/:taskid', async(req, res) =>{
  const {description, title, section} = req.body
  const {taskid} = req.params
  const task = await Task.findById(taskid).then(result => result).catch(err=> console.log(err))

  if(description) task.description = description
  if(title) task.title = title
  if(section) task.section = section

  task.save().then(result => res.send(result)).catch(err=> console.log(err))
})

app.delete('/tasks/:taskid', async (req, res)=>{
  const {taskid} = req.params

  await Task.deleteOne({_id:taskid}).then(result => res.send(result)).catch(err=>console.log(err))

})

app.get('/sections', async(req, res)=>{
  Section.find()
    .then(result=>{
      res.send(result)
    })
    .catch(err=> console.log(err))
})

app.post('/sections', async(req,res)=>{
  const {name} = req.body

  Section.findOne({name: name})
  .then(result=> {
    if (result){
      res.send("Name exists")
      return
    }else{
      if(name) {
        const section = new Section()
        section.name = name
        section.save().then(result=> res.send(result)).catch(err=> console.log(err))
      }
      else{
        res.send("Empty Name")
      }
    }
  })
  .catch(err=> console.log(err))

})

app.listen(4000, ()=>console.log('listening'));
