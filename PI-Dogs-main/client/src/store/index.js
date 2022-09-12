import { createStore, applyMiddleware,  compose} from 'redux';
//import { composeWithDevtools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import reducer  from '../reducers/index.js'

const store = createStore(reducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
      );

export default store;