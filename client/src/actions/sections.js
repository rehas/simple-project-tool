import request from 'superagent'

const baseUrl = 'http://localhost:4000'

export const GET_ALL_SECTIONS = 'GET_ALL_SECTIONS'

const getAllSectionsSuccess = ( sections) =>({
  type : GET_ALL_SECTIONS,
  payload: sections
})

export const getAllSections = () => (dispatch) =>{
  request
    .get(`${baseUrl}/sections`)
    .then(response=> {
      dispatch(getAllSectionsSuccess(response.body))
    })
    .catch(err=> console.log(err))
}

export const addNewSection = (data) => (dispatch) =>{
  request
    .post(`${baseUrl}/sections`)
    .send(data)
    .then(response=>{
      dispatch(getAllSections())
    })
    .catch(err=> console.log(err))
}