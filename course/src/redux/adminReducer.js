const SET_USERS = "network/auth/SET_USER_DATA";
const UPDATE_USERS = "network/auth/UPDATE_USERS";
const SET_AUTH_USER = "network/auth/SET_AUTH_USER";
const SET_SELECT_OLL = "network/auth/SET_SELECT_OLL";
const REMOVE_OLL = "network/auth/REMOVE_OLL";
const SELECT_USER = "network/auth/SELECT_USER";
const REMOVE_SELECT_USER = "network/auth/REMOVE_SELECT_USER";

let initialization = {
    users: [
        {
            id: 1,
            email: "a@!",
            userName: "admin",
            registerDate: "10-10-2020",
            lastLoginDate: "10-10-2020",
            status: true,
        }
    ],
    isAuth: false,
    authUserId: null,
    authUserEmail: null,
    authUserName: null,
    selectedOll: false,
    selectedUsersId: [],
}

const adminReducer = (state = initialization, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                isAuth: action.isAuth,
                authUserUserId: action.id,
                authUserEmail: action.email,
                authUserLogin: action.login,
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case UPDATE_USERS:
            return {
                ...state,
                users: action.users,
            }
        case SET_SELECT_OLL:
            return {
                ...state,
                selectedOll: action.status,
                selectedUsersId: [...state.users.map(i => i.userId)],
            }
        case REMOVE_OLL:
            return {
                ...state,
                selectedOll: action.status,
                selectedUsersId: [],
            }
        case SELECT_USER:
            return {
                ...state,
                selectedUsersId: [...state.selectedUsersId, action.id],
            }
        case REMOVE_SELECT_USER:
            return {
                ...state,
                selectedUsersId: state.selectedUsersId.filter(i => i !== action.id),
            }
        default:
            return state
    }
}

export const setAuthUser = (email, login, isAuth) => (
    {type: SET_AUTH_USER, email, login, isAuth}
);
export const initializeUsers = (users) => ({type: SET_USERS, users});
export const updateUsers = (users) => ({type: UPDATE_USERS, users});
export const setSelectionOll = (status) => ({type: SET_SELECT_OLL, status});
export const removeSelectionOll = (status) => ({type: REMOVE_OLL, status});
export const addSelectUser = (id) => ({type: SELECT_USER, id});
export const removeSelectUser = (id) => ({type: REMOVE_SELECT_USER, id});


export const setUsers = () => (dispatch) => {
    fetch('/users').then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(initializeUsers(data.users))
        } else {
            alert(data.err)
        }
    })
}

export const signUp = (userData) => (dispatch) => {
    fetch('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json()).then(data => {
        debugger
        dispatch(setAuthUser(userData.email, userData.name, true))
    })
}

export const signIn = (userData) => (dispatch) => {
    fetch('/auth', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUser(data.authId, userData.email, userData.name, true))
        } else {
            alert(data.message);
        }
    })
}

export const signOut = () => (dispatch) => {
    fetch('/logout').then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            debugger
            dispatch(setAuthUser(null, null, null, false))
        }
        console.log(data.message)
    })
}

export const deleteUser = (selectedUsersId) => (dispatch) => {
    fetch('/users', {
        method: 'DELETE',
        body: JSON.stringify(selectedUsersId),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json()).then(data => {
        if (data.resultCode === 0 && data.logOut === true) {
            dispatch(setAuthUser(null, null, null, false))
            dispatch(updateUsers(data.users))
            dispatch(removeSelectionOll(false))
        } else if (data.resultCode === 0 && data.logOut === false) {
            dispatch(updateUsers(data.users))
            dispatch(removeSelectionOll(false))
        }
    })
}

export const updateUserStatus = (status, selectedUsersId) => (dispatch) => {
    debugger
    fetch('/users', {
        method: 'PUT',
        body: JSON.stringify({status, selectedUsersId}),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json()).then(data => {
        if (data.resultCode === 0 && data.logOut === true) {
            dispatch(setAuthUser(null, null, null, false))
            dispatch(updateUsers(data.users))
            dispatch(removeSelectionOll(false))
            console.log("User is blocked. Log out")
        } else if (data.resultCode === 0 && data.logOut === false) {
            dispatch(updateUsers(data.users))
            dispatch(removeSelectionOll(false))
        }
    })
}
export const setSelect = (id, selectedStatus) => (dispatch) => {
    if (selectedStatus) {
        dispatch(addSelectUser(id))
    } else {
        dispatch(removeSelectUser(id))
    }
}
export const selectOll = (selected) => (dispatch) => {
    if (selected) {
        dispatch(setSelectionOll(selected))
    } else {
        dispatch(removeSelectionOll(selected))
    }
}
export default adminReducer;