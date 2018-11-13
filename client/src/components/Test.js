import React from 'react'
import Board from 'react-trello'
import {withStyles} from '@material-ui/core'
import {connect} from 'react-redux'
import {getAllTasks} from '../actions/tasks'

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

const sections = [
  {name: "unset"},
  {name: "FlowCharts"},
  {name: "WireFrames"},
  {name: "Prototype"},
  {name: "Development"},
  {name: "Test"},
  {name: "Launch"},
]

const dataSet = (sectionsObj, tasks = []) =>{
  return {
    lanes: sectionsObj.map(section=>{
      return {
        id: section.name, 
        title: section.name,
        cards: tasks.filter(task=> task.section.toLowerCase() === section.name.toLowerCase()).map(task=> ({...task, id: task._id}))
      }
    })
  }
}

console.log((dataSet(sections)))

let data = dataSet(sections)

class Test extends React.Component {

  componentDidMount = () => {
    this.props.getAllTasks()
  }
  handleDragStart = (cardId, laneId) =>{
    console.log('drag started')
        console.log(`cardId: ${cardId}`)
        console.log(`laneId: ${laneId}`)
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, card) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
    console.log(card)
  }

  render() {

    const {taskList} = this.props

    if (taskList){
      data = dataSet(sections, taskList)
    }

    

    return <Board 
      draggable data={data}
      handleDragStart={this.handleDragStart}
      handleDragEnd={this.handleDragEnd}
      />
  }
}

const mapStateToProps = (state) => {
  return {
    taskList : state.tasks
  }
}

const mapDispatchToProps = {
  getAllTasks
}

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(Test))