import React, {PureComponent} from 'react'
import TaskItem from './TaskItem';

class Phase extends PureComponent{
  handleDrag = (e) => {
    console.log(e)
  }
  render(){
    return (
      this.props.sectionName && 
      <div
      onDragOver={this.handleDrag}
      >
        {this.props.sectionName}
        <TaskItem/>
      </div>
    )
  }
}

export default Phase