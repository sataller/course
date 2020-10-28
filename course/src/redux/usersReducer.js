const SET_USERS = "network/auth/SET_USER_DATA";
const SET_AUTH_USER = "network/auth/SET_AUTH_USER";


let initialization = {
    users: [],
    isAuth: false,
    authUserId: null,
    authUserEmail: null,
    authUserName: null,
    selectedOll: false,
    selectedUsersId: [],
}

const userReducer = (state = initialization, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {}
        case SET_USERS:
            return {}
        default:
            return state
    }
}


export default userReducer;