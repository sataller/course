const SET_USERS = "network/auth/SET_USER_DATA";
const LOGIN = "network/auth/LOGIN";
const LOGOUT = "network/auth/LOGOUT";
const SHOW_MESSAGE = "network/auth/SHOW_MESSAGE";


let initialization = {
    isAuth: false,
    authUser: null,
    message: null,
};

const authReducer = (state = initialization, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                authUser: action.user,
                isAuth: true,
            };
        case LOGOUT:
            return {
                ...state,
                authUser: null,
                isAuth: false,
            };
        case SHOW_MESSAGE:
            debugger
            return {
                ...state,
                message: action.message,
            };
        default:
            return state
    }
};

export const login = (user) => ({type: LOGIN, user});
export const logOut = (user) => ({type: LOGOUT});
export const message = (message) => ({type: SHOW_MESSAGE, message});

export const signOut = () => (dispatch) => {
    localStorage.removeItem('Authorization');
    dispatch(logOut());
};

export const signIn = (email, password) => async (dispatch) => {
    fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            "Content-type": "application/json",
        }
    })
        .then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            localStorage.setItem('Authorization', data.token);
            localStorage.setItem('them', data.user.them);
            dispatch(login(data.user));
        } else {
            dispatch(message(data.message));
            console.log(data);
        }
    })
};

export const getAuthUserData = () => async (dispatch) => {
    fetch('/api/auth/me', {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    })
        .then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(login(data.user));
            localStorage.setItem('them', data.user.them);
        } else {
            dispatch(message(data.message));
        }
    })
};

export const signUp = (email, name, password) => async (dispatch) => {
    fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({email, name, password}),
        headers: {
            "Content-type": "application/json",
        }
    })
        .then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            console.log(data);
            dispatch(message(data.message));
        } else {
            dispatch(message(data.message));
            console.log(data);
        }
    })
};


export default authReducer;