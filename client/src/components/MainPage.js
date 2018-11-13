import React, {PureComponent} from 'react'
import Phase from './Phase';
import {Row, Col} from 'react-flexbox-grid'
import {withStyles} from '@material-ui/core'

const styles = theme =>({
  root : {
    backgroundColor : theme.palette.primary.light,
    height: '100vh'
  },
  f:{
    backgroundColor : theme.palette.secondary.light
  }
})

class MainPage extends PureComponent{
  render(){
    const {classes }= this.props
    return (
      <Row lg={12} className={classes.root}>
      <Col lg={6} className={classes.f}>
        <Phase sectionName={'test'}/>
      </Col>
      <Col lg={6}>
        <Phase sectionName={'development'}/>
      </Col>
      </Row>
    )
  }
}

export default withStyles(styles)(MainPage)