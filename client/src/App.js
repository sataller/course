import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from "./components/MainPage/MainPage";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/ReduxStore";
import SignInContainer from "./components/LoginPage/SignInPage/SignInContainer";
import SignUpContainer from "./components/LoginPage/SignUpPage/SignUpContainer";
import UserPage from "./components/UserPage/UserPage";
import AdminPageContainer from "./components/AdminPage/AdminPageContainer";
import ItemInfo from "./components/MainPage/HistoryItems/ItemInfo/ItemInfo";

function App() {

    // let background = "day";
    let background = "night";

    return (
        <div className={`${"App " + background}`}>
            <Switch>
                <Route exact path="/" render={() => <Redirect to={"/main"}/>}/>
                <Route path="/main" render={() => <MainPage/>}/>
                <Route path="/admin" render={() => <AdminPageContainer/>}/>
                <Route path="/profile/:userId?" render={() => <UserPage/>}/>
                <Route path="/history/1" render={() => <ItemInfo/>}/>
                <Route path="/auth/login" render={() => <SignInContainer/>}/>
                <Route path="/auth/register" render={() => <SignUpContainer/>}/>
                <Route path="*" render={() => <div> 404 NOT FOUND</div>}/>
            </Switch>
        </div>
    );
};


let MainAppJS = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    )
}
export default MainAppJS


