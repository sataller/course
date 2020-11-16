import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageContainer from "./components/MainPage/MainPageContainer";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/ReduxStore";
import SignInContainer from "./components/LoginPage/SignInPage/SignInContainer";
import SignUpContainer from "./components/LoginPage/SignUpPage/SignUpContainer";
import AdminPageContainer from "./components/AdminPage/AdminPageContainer";
import ItemInfo from "./components/MainPage/HistoryItems/ItemInfo/ItemInfo";
import UserPageContainer from "./components/Profile/ProfileContainer";
import RegisterCompletedPage from "./components/LoginPage/SignUpPage/RegisterCompletedPage";
import RegisterConfirmedPage from "./components/LoginPage/SignUpPage/RegisterConfirmedPage";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        let background = localStorage.getItem('them') || "day";
        if (this.props.authUser) {
            background = this.props.authUser.them;
        }

        return (
            <div className={`${"App " + background}`}>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to={"/main"}/>}/>
                    <Route path="/main" render={() => <MainPageContainer/>}/>
                    <Route path="/admin" render={() => <AdminPageContainer/>}/>
                    <Route path="/profile/:userId?" render={() => <UserPageContainer/>}/>
                    <Route path="/history/:historyId" render={() => <ItemInfo/>}/>
                    <Route path="/auth/login" render={() => <SignInContainer/>}/>
                    <Route path="/auth/register" render={() => <SignUpContainer/>}/>
                    <Route path="/auth/complete" render={() => <RegisterCompletedPage/>}/>
                    <Route path="/auth/confirmed" render={() => <RegisterConfirmedPage/>}/>
                    <Route path="*" render={() => <div> 404 NOT FOUND</div>}/>
                </Switch>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        initialized: state.appPage.initialized,
        authUser: state.authPage.authUser,
        isAuth: state.authPage.isAuth,
    }
}

let AppContainer =  connect(mapStateToProps, {initializeApp})(App);

let MainAppJS = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}
export default MainAppJS

