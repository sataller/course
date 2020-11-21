import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import historyReducer from "./historyReducer";


let reducers = combineReducers(
    {
        authPage: authReducer,
        appPage:appReducer,
        userPage: userReducer,
        historyPage: historyReducer,
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store
export default store