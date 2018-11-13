import React, {Component} from 'react'
import Board from 'react-trello'
import {withStyles} from '@material-ui/core'
import {connect} from 'react-redux'
import {getAllTasks, editTaskById, addTask, deleteTaskWithId} from '../actions/tasks'
import {getAllSections, addNewSection} from '../actions/sections'

const styles = theme =>({
  root : {
    backgroundColor : theme.palette.primary.light,
    height: '100vh'
  },
  f:{
    backgroundColor : theme.palette.secondary.light,
    border: '1px solid black'
  }
})

// const sectionsInitial = [
//   {name: "unset"},
//   {name: "FlowCharts"},
//   {name: "WireFrames"},
//   {name: "Prototype"},
//   {name: "Development"},
//   {name: "Test"},
//   {name: "Launch"},
// ]

const dataSet = (sectionsObj=[], tasks = []) =>{
  return {
    lanes: sectionsObj.sort((x, y)=> -1).map(section=>{
      return {
        id: section.name, 
        title: section.name,
        cards: tasks.filter(task=> task.section.toLowerCase() === section.name.toLowerCase()).map(task=> ({...task, id: task._id}))
      }
    })
  }
}

// console.log((dataSet(sections)))

// let data = dataSet(sectionsInitial)


class NewCard extends Component {
  updateField = (field, evt) => {
    this.setState({[field]: evt.target.value})
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  render() {
    const {onCancel} = this.props
    return (
      <div style={{background: 'white', borderRadius: 3, border: '1px solid #eee', borderBottom: '1px solid #ccc'}}>
        <div style={{padding: 5, margin: 5}}>
          <div>
            <div style={{marginBottom: 5}}>
              <input type="text" onChange={evt => this.updateField('title', evt)} placeholder="Title" />
            </div>
            <div style={{marginBottom: 5}}>
              <input type="text" onChange={evt => this.updateField('description', evt)} placeholder="Description" />
            </div>
          </div>
          <button onClick={this.handleAdd}>Add</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    )
  }
}


class MainPage extends React.Component {

  // state = {
  //   laneSize : this.props.sections ? this.props.sections.length : sectionsInitial.length
  // }

  componentDidMount = () => {
    // this.props.getAllSections()
    this.props.getAllTasks()
    this.props.getAllSections()
    console.log(this.props.sections && this.props.sections.length)
    // this.setState({
    //   laneSize: this.props.sections ? this.props.sections.length : sectionsInitial.length
    // })
  }
  handleDragStart = (cardId, laneId) =>{
    console.log('drag started')
        console.log(`cardId: ${cardId}`)
        console.log(`laneId: ${laneId}`)
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, card) => {
    // console.log('drag ended')
    // console.log(`cardId: ${cardId}`)
    // console.log(`sourceLaneId: ${sourceLaneId}`)
    // console.log(`targetLaneId: ${targetLaneId}`)
    // console.log(card)
    this.props.editTaskById(cardId, {
      ...card,
      section : targetLaneId
    })
  }

  handleCardDelete = (cardId)=>{
    console.log(cardId)
    this.props.deleteTaskWithId(cardId)
  }

  handleCardAdd = (card, laneId) =>{
    this.props.addTask({
      ...card, 
      section: laneId
    })
  }

  handleAdd = (a,b,c) =>{
    console.log("lane added?")
    console.log(a)
    console.log(a.lanes[a.lanes.length-1])
    const laneAdded = a.lanes[a.lanes.length-1]

    if(this.props.sections && this.props.sections.filter(section=> section&& section.name.includes(laneAdded.title)).length===0 ){
      this.props.addNewSection({name:laneAdded.title})
    }


  }
  


  render() {

    const {taskList, sections} = this.props
    let data = dataSet()
    console.log(taskList)
    console.log(sections)

    if (taskList && sections){
      data = dataSet(sections, taskList)
    }
    

    return <Board 
      draggable data={data}
      handleDragStart={this.handleDragStart}
      handleDragEnd={this.handleDragEnd}
      laneDraggable={false}
      laneEditable={false}
      laneSortFunction={(card1, card2) => new Date(card2.date) - new Date(card1.date)}
      onCardDelete={this.handleCardDelete}
      onCardAdd={this.handleCardAdd} 
      onCardDelete={this.handleCardDelete}
      editable
      onDataChange={this.handleAdd}
      />
  }
}

const mapStateToProps = (state) => {
  return {
    taskList : state.tasks,
    sections : state.sections
  }
}

const mapDispatchToProps = {
  getAllTasks, editTaskById, addTask, deleteTaskWithId, getAllSections,addNewSection
}
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(MainPage))
