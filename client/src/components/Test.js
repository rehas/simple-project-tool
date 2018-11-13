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


const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
        {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}

class Test extends React.Component {

  componentDidMount = () => {
    this.props.getAllTasks()
  }

  render() {
    return <Board draggable data={data} />
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