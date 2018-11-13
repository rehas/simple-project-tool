import React, {PureComponent} from 'react'

class TaskItem extends PureComponent{
  // onDragStart = (e, data) =>{
  //   console.log(e)
  //   console.log(data)
  //   e.dataTransfer.setData("text/plain",data)
  // }
  render(){
    const {data, sName} = this.props
    // console.log(data, sName)
    return (
      <div 
      onDragStart = {(e) =>this.props.taskdragHandler(e, data.title)}
      draggable
      >{this.props.data.title}
        </div>
    )
  }
}

export default TaskItem