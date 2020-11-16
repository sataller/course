import {getAuthUserData, signOut} from "./authReducer";

const SET_USERS = "network/auth/SET_USER_DATA";
const UPDATE_USER = "network/auth/UPDATE_USERS";
const SET_USER = "network/auth/SET_USER";
const REMOVE_USER = "network/auth/REMOVE_USER";
const REMOVE_OLL = "network/auth/REMOVE_OLL";
const SELECT_USER = "network/auth/SELECT_USER";
const REMOVE_SELECT_USER = "network/auth/REMOVE_SELECT_USER";

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
        // case REMOVE_OLL:
        //     return {
        //         ...state,
        //         selectedOll: action.status,
        //         selectedUsersId: [],
        //     }
        default:
            return state
    }
}


export const initializeUsers = (users) => ({type: SET_USERS, users});
export const refreshUser = (user) => ({type: UPDATE_USER, user});
export const setUser = (user) => ({type: SET_USER, user});
export const removeUser = (userId) => ({type: REMOVE_USER, userId});
// export const removeSelectionOll = (status) => ({type: REMOVE_OLL, status});

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
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    })
        .then(response => response.json()).then(data => {
        dispatch(getAuthUserData());
        dispatch(refreshUser(data.user));
        dispatch(setUser(data.user));
    })
};

export const getUser = (userId) => (dispatch) => {
    fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
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
// // export const signIn = (userData) => (dispatch) => {
// //     fetch('/auth', {
// //         method: 'POST',
// //         body: JSON.stringify(userData),
// //         headers: {
// //             "Content-type": "application/json"
// //         }
// //     })
// //         .then(response => response.json()).then(data => {
// //         if (data.resultCode === 0) {
// //             dispatch(setAuthUser(data.authId, userData.email, userData.name, true))
// //         } else {
// //             alert(data.message);
// //         }
// //     })
// // }
//
// export const signOut = () => (dispatch) => {
//     fetch('/logout').then(response => response.json()).then(data => {
//         if (data.resultCode === 0) {
//             debugger
//             dispatch(setAuthUser(null, null, null, false))
//         }
//         console.log(data.message)
//     })
// }
//

//
// export const updateUserStatus = (status, selectedUsersId) => (dispatch) => {
//     debugger
//     fetch('/users', {
//         method: 'PUT',
//         body: JSON.stringify({status, selectedUsersId}),
//         headers: {
//             "Content-type": "application/json"
//         }
//     }).then(response => response.json()).then(data => {
//         if (data.resultCode === 0 && data.logOut === true) {
//             dispatch(setAuthUser(null, null, null, false))
//             dispatch(updateUsers(data.users))
//             dispatch(removeSelectionOll(false))
//             console.log("User is blocked. Log out")
//         } else if (data.resultCode === 0 && data.logOut === false) {
//             dispatch(updateUsers(data.users))
//             dispatch(removeSelectionOll(false))
//         }
//     })
// }
// export const setSelect = (id, selectedStatus) => (dispatch) => {
//     if (selectedStatus) {
//         dispatch(addSelectUser(id))
//     } else {
//         dispatch(removeSelectUser(id))
//     }
// }
// export const selectOll = (selected) => (dispatch) => {
//     if (selected) {
//         dispatch(setSelectionOll(selected))
//     } else {
//         dispatch(removeSelectionOll(selected))
//     }
// }
export default userReducer;