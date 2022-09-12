import axios from 'axios'

export function getAllDogs(){
    return async function(dispatch) {
        const dogs = await axios.get('http://localhost:3001/dogs')
        dispatch({
            type: 'GET_ALL_DOGS',
            payload: dogs.data
        })
    }
}

export function getDogsName(name){
    return async function(dispatch) {
        const dog = await axios.get(`http://localhost:3001/dogs/?name=${name}`)
        dispatch({
            type: 'GET_DOGS_NAME',
            payload: dog.data
        })
    }
}

export function getDogId(id){
    return async function(dispatch) {
        const dog = await axios.get(`http://localhost:3001/dogs/${id}`)
        //console.log(dog)
        dispatch({
            type: 'GET_ID_DOG',
            payload: dog.data[0]
        })
    }
}

export function orderBy(dogs){
        return{
            type: 'ORDER_BY',
            payload: dogs
        }
    }
