import React, {PureComponent} from 'react'
import Phase from './Phase';
import {Row, Col} from 'react-flexbox-grid'
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

class MainPage extends PureComponent{

  componentDidMount = () => {
    this.props.getAllTasks()
  }

  render(){
    const {classes, taskList }= this.props
    return (
      <Row lg={12} className={classes.root}>
      {taskList && sections.map(section=>{
        
        return (<Col key={section.name} lg={12 / sections.length} className={classes.f}>
          <Phase sectionName={section.name} data={taskList.filter(task=>{
            return (task.section.toLowerCase() === section.name.toLowerCase() )
          })}/>
        </Col>)
      })}
      </Row>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(MainPage))