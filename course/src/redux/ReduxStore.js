import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk"
import adminReducer from "./adminReducer";


let reducers = combineReducers(
    {
        usersPage: usersReducer,
        adminPage: adminReducer,
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store
export default store