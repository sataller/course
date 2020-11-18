import {getAuthUserData, signOut} from "./authReducer";

const SET_USERS = "network/auth/SET_USER_DATA";
const UPDATE_USER = "network/auth/UPDATE_USERS";
const SET_USER = "network/auth/SET_USER";
const REMOVE_USER = "network/auth/REMOVE_USER";

let initialization = {
    users: [],
    selectedUsersId: [],
    userProfile: null,
}

const userReducer = (state = initialization, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(i => {
                    if (i.id === action.user.id) {
                        return action.user;
                    } else {
                        return i
                    }
                }),
            };
        case SET_USER:
            return {
                ...state,
                userProfile: action.user,
            };
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(i => i.id !== action.userId)
            };
        default:
            return state
    }
}


export const initializeUsers = (users) => ({type: SET_USERS, users});
export const refreshUser = (user) => ({type: UPDATE_USER, user});
export const setUser = (user) => ({type: SET_USER, user});
export const removeUser = (userId) => ({type: REMOVE_USER, userId});

export const setUsers = () => (dispatch) => {
    fetch('/api/users', {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    }).then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(initializeUsers(data.users))
        } else {
            alert(data.err)
        }
    })
};

export const updateUser = (userData) => (dispatch) => {
    fetch(`/api/users/${userData.userId}`, {
        method: 'PATCH',
        body: JSON.stringify({...userData}),
        headers: {
           " Content-Security-Policy": "default-src 'self'; script-src https://static.ads-twitter.com https://www.google-analytics.com; img-src 'self' https://s3.amazonaws.com https://twitter.com https://pbs.twimg.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; frame-ancestors 'none';",
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    })
        .then(response => response.json()).then(data => {
            if (data.resultCode === 0){
                dispatch(getAuthUserData());
                dispatch(refreshUser(data.user));
                dispatch(setUser(data.user));
            } else {
                alert(data.message);
            }

    })
};

export const getUser = (userId) => (dispatch) => {
    fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
            " Content-Security-Policy": "default-src 'self'; script-src https://static.ads-twitter.com https://www.google-analytics.com; img-src 'self' https://s3.amazonaws.com https://twitter.com https://pbs.twimg.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; frame-ancestors 'none';",
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    })
        .then(response => response.json()).then(data => {
        dispatch(setUser(data.user));
    })
};

export const deleteUser = (userId, id) => (dispatch) => {
    fetch('/api/users', {
        method: 'DELETE',
        body: JSON.stringify(userId),
        headers: {
            "Authorization": localStorage.getItem('Authorization')
        }
    }).then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(removeUser(userId));
            if (userId === id) {
                dispatch(signOut());
            }
        } else {
            alert(data.message)
        }
    })
};

export default userReducer;