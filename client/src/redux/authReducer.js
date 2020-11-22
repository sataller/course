const LOGIN = "network/auth/LOGIN";
const LOGOUT = "network/auth/LOGOUT";


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
        default:
            return state
    }
};

export const login = (user) => ({type: LOGIN, user});
export const logOut = () => ({type: LOGOUT});

export const signOut = () => (dispatch) => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('times');
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
            let date = new Date();
            let timestamp = date.getTime().toString();
            localStorage.setItem('Authorization', data.token);
            localStorage.setItem('time', timestamp);
            localStorage.setItem('them', data.user.them);
            dispatch(login(data.user));
        } else {
            alert(data.message);
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
            alert(data.message);
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
            alert(data.message);
        } else {
            console.log(data);
            alert(data.message);

        }
    })
};


export default authReducer;