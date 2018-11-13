import React, {PureComponent} from 'react'
import TaskItem from './TaskItem';

class Phase extends PureComponent{
  handleDrag = (e, sectionName) => {
    // e.preventDefault();
    console.log(`Drag captured on ${sectionName}`)
    e.dataTransfer.setData("text/plain",sectionName)
    // console.log(e)
  }

  handleDrop = (e, name) =>{
    let data = e.dataTransfer.getData('data')

    console.log(`Drop captured on ${name}`)
    console.log('data=>', data)
    // e.dataTransfer.setData("text/plain", name)
    // console.log(e)
    // console.log(e.dataTransfer.getData('name'))

  }

  taskDragHandler = (e, data) =>{
    // e.preventDefault()
    // console.log(e)
    // console.log(data)
    console.log('dragStart', data)
    e.dataTransfer.setData("text/plain",data)
  }
  taskdropHandler = (e, data, sectionName) =>{
      // e.preventDefault()
      // console.log(e)
      // console.log(data)
      // e.dataTransfer.setData("text/plain",data)
      // e.dataTransfer.setData("text/plain", 'hola')
      // console.log(`dropped on ${sectionName}`)
      console.log(sectionName)
      const d = e.dataTransfer.getData("text")
      console.log(d)
  }

  render(){
    return (
      this.props.sectionName && this.props.data &&
      <div className="droppable"
      name={this.props.sectionName}
      onDragOver ={(e) => this.handleDrag (e, this.props.sectionName)}
      onDrop = {(e) =>this.handleDrop(e, this.props.sectionName)}
      
      >
        {this.props.sectionName}
        {this.props.data && this.props.data.map((task,i)=>{
          return (
            <TaskItem key={task._id} data = {task} taskdragHandler={this.taskDragHandler} sName={this.props.sectionName}/>
          )
        })}
      </div>
    )
  }
}

export default Phase