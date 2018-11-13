import request from 'superagent'

const baseUrl = 'http://localhost:4000'

export const GET_ALL_TASKS = 'GET_ALL_TASKS'

const getAllTasksSuccess = (tasks) =>({
  type : GET_ALL_TASKS,
  payload: tasks
})

export const getAllTasks = () => (dispatch) =>{
  request
    .get(`${baseUrl}/tasks`)
    .then(response=> {
      dispatch(getAllTasksSuccess(response.body))
    })
    .catch(err=> console.log(err))
}