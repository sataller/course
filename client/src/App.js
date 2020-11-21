import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageContainer from "./components/MainPage/MainPageContainer";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/ReduxStore";
import SignInContainer from "./components/LoginPage/SignInPage/SignInContainer";
import SignUpContainer from "./components/LoginPage/SignUpPage/SignUpContainer";
import AdminPageContainer from "./components/AdminPage/AdminPageContainer";
import UserPageContainer from "./components/Profile/ProfileContainer";
import RegisterCompletedPage from "./components/LoginPage/SignUpPage/RegisterCompletedPage";
import RegisterConfirmedPage from "./components/LoginPage/SignUpPage/RegisterConfirmedPage";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import HistoryPageContainer from "./components/HistoryPage/HistoryPageContainer";
import EditorContainer from "./components/HistoryPage/Editor/EditorContainer";
import ChapterCreatePageContainer from "./components/HistoryPage/ChapterCreatePage/ChapterCreatePageContainer";

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        let date = new Date();
        let timestamp = (+ date.getTime().toString()) - (+ localStorage.getItem('time'));
        debugger
        if (timestamp> 18000000){
            localStorage.removeItem('Authorization');
            localStorage.removeItem('time');
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
                    <Route path="/history/:historyId" render={() => <HistoryPageContainer/>}/>
                    <Route path="/create/:historyId/chapter" render={() => <ChapterCreatePageContainer/>}/>
                    {/*<Route path="/create/history" render={() => <HistoryPageContainer/>}/>*/}
                    <Route path="/editor/:historyId/:chapterId?" render={() => <EditorContainer/>}/>
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


