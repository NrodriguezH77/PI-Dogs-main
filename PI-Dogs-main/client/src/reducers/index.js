const initialState = {
    dogsLoaded: [],
    dogDetail: {},

}

export default function reducer(state=initialState, action){

    switch(action.type){
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogsLoaded: action.payload
            }

        case 'GET_ID_DOG':
            return {
                ...state,
                dogDetail: action.payload
            }

        case 'GET_DOGS_NAME':
             
            return {
                ...state,
                dogsLoaded: action.payload
            }
        
        case 'ORDER_BY':
            return {
               ...state,
               dogsLoaded: action.payload
           }
        default :
            return state
        
    }

}