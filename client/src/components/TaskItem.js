import React, {PureComponent} from 'react'

class TaskItem extends PureComponent{
  onDragStart = (e, data) =>{
    console.log(e)
    console.log(data)
  }
  render(){
    const data = "I'm data"
    return (
      <div 
      onDragStart = {(e) =>this.onDragStart(e, data)}
      draggable
      >task</div>
    )
  }
}

export default TaskItem