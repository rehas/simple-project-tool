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

const Cat = mongoose.model('Cat', { name: String });
const Task = task
const Section = section
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
// const task1 = new Task({title : 'test1', description : 'test description', section: 'section 1'})

// task1.save().then(()=> console.log('user saved'))

app.get('/tasks', async (req, res)=>{
  Task.find()
    .then(result=> {
      console.log(result)
      res.send(result)
    })
    .catch(err=> {
      console.log(err)
      res.send('error'+ err.code)
    })
})

app.get('/tasks/:taskid', async (req, res) =>{
  console.log(req.params)
  const {taskid} = req.params
  const task = await Task.findById(taskid).then(result=> result).catch(err=> console.log(err))
  console.log(task)
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
  console.log(req.body)
  console.log(req.params.taskid)
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

  console.log(taskid)

  console.log(await Task.findById(taskid))

  // const task = await Task.findById(taskid)

  // task.

  await Task.deleteOne({_id:taskid}).then(result => res.send(result)).catch(err=>console.log(err))

  

})

app.get('/sections', async(req, res)=>{
  Section.find()
    .then(result=>{
      console.log(result)
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
