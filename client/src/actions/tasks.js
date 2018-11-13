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

export const editTaskById = (id, data) => (dispatch) =>{
  request
    .patch(`${baseUrl}/tasks/${id}`)
    .send(data)
    .then(response=>{
      dispatch(getAllTasks())
    })
    .catch(err=> console.log(err))
}

export const deleteTaskWithId = (id) =>(dispatch) =>{
  request
    .delete(`${baseUrl}/tasks/${id}`)
    .then(response=> {
      dispatch(getAllTasks())
    })
    .catch(err=> console.log(err))
}

export const addTask = (taskBody) => (dispatch) =>{
  request
    .post(`${baseUrl}/tasks`)
    .send(taskBody)
    .then(response=> {
      dispatch(getAllTasks())
    })
    .catch(err=> console.log(err))
}