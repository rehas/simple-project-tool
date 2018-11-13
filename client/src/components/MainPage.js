import React from 'react'
import Board from 'react-trello'
import {connect} from 'react-redux'
import {getAllTasks, editTaskById, addTask, deleteTaskWithId} from '../actions/tasks'
import {getAllSections, addNewSection} from '../actions/sections'

const dataSet = (sectionsObj=[], tasks = []) =>{
  return {
    lanes: sectionsObj.sort((x, y)=> x.id - y.id).map(section=>{
      return {
        id: section.name, 
        title: section.name,
        cards: tasks.filter(task=> task.section.toLowerCase() === section.name.toLowerCase()).map(task=> ({...task, id: task._id}))
      }
    })
  }
}

class MainPage extends React.Component {

  componentDidMount = () => {
    this.props.getAllTasks()
    this.props.getAllSections()
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, card) => {
    this.props.editTaskById(cardId, {
      ...card,
      section : targetLaneId
    })
  }

  handleCardDelete = (cardId)=>{
    this.props.deleteTaskWithId(cardId)
  }

  handleCardAdd = (card, laneId) =>{
    this.props.addTask({
      ...card, 
      section: laneId
    })
  }

  handleAdd = (a,b,c) =>{
    const laneAdded = a.lanes[a.lanes.length-1]
    if(this.props.sections && this.props.sections.filter(section=> section&& section.name.includes(laneAdded.title)).length===0 ){
      this.props.addNewSection({name:laneAdded.title})
    }
  }

  render() {

    const {taskList, sections} = this.props
    let data = dataSet()

    if (taskList && sections){
      data = dataSet(sections, taskList)
    }

    return <Board 
      draggable data={data}
      handleDragEnd={this.handleDragEnd}
      laneDraggable={false}
      laneEditable={false}
      laneSortFunction={(card1, card2) => new Date(card2.date) - new Date(card1.date)}
      onCardDelete={this.handleCardDelete}
      onCardAdd={this.handleCardAdd} 
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
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
