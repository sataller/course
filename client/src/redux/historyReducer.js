const SET_HISTORIES = "network/auth/SET_HISTORIES";
const UPDATE_HISTORY = "network/auth/UPDATE_USERS";
const SET_HISTORY = "network/auth/SET_HISTORY";
// const SET_SELECT_OLL = "network/auth/SET_SELECT_OLL";
// const REMOVE_OLL = "network/auth/REMOVE_OLL";
// const SELECT_USER = "network/auth/SELECT_USER";
// const REMOVE_SELECT_USER = "network/auth/REMOVE_SELECT_USER";

let initialization = {
    histories: [],
    history: null,
    selectedUsersId: [],
    userProfile: null,
}

const historyReducer = (state = initialization, action) => {
    switch (action.type) {
        case SET_HISTORIES:
            return {
                ...state,
                histories: action.histories,
            };
        case UPDATE_HISTORY:
            return {
                ...state,
                histories: state.histories.map(i => {
                    if (action.history) {
                        if (i._id === action.history._id) {
                            return action.history;
                        } else {
                            return i
                        }
                    } else {
                        i.author = action.user.name;
                        return i
                    }
                }),
            };
        case SET_HISTORY:
            return {
                ...state,
                history: action.history,
            };
        // case SET_USER:
        //     return {
        //         ...state,
        //         userProfile: action.user,
        //     };
        // case REMOVE_SELECT_USER:
        //     return {
        //         ...state,
        //         selectedUsersId: state.selectedUsersId.filter(i => i !== action.id),
        //     };
        default:
            return state
    }
}


export const initializeHistories = (histories) => ({type: SET_HISTORIES, histories});
export const refreshHistory = (history) => ({type: UPDATE_HISTORY, history});
export const setHistory = (history) => ({type: SET_HISTORY, history});
// export const removeSelectUser = (id) => ({type: REMOVE_SELECT_USER, id});
// export const setUser = (user) => ({type: SET_USER, user});

export const setUserHistories = (userId) => (dispatch) => {
    fetch(`/api/history/${userId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    }).then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(initializeHistories(data.histories))
        } else {
            alert(data.err)
        }
    })
};

export const setHistories = () => (dispatch) => {
    fetch(`/api/history`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    }).then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(initializeHistories(data.histories))
        } else {
            alert(data.err)
        }
    })
};
export const setReadableHistory = (historyId) => (dispatch) => {
    fetch(`/api/history/read/${historyId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    }).then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(setHistory(data.history))
        } else {
            alert(data.err)
        }
    });
};

export const updateHistory = (historyData) => (dispatch) => {
    fetch(`/api/history/${historyData.historyId}`, {
        method: 'PATCH',
        body: JSON.stringify({...historyData}),
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    })
        .then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(refreshHistory(data.history));
            dispatch(setHistory(data.history));
        } else {
            alert(data.message);
        }
    })
};
export const updateHistoryAuthor = (historyData) => (dispatch) => {
    fetch(`/api/history/`, {
        method: 'PATCH',
        body: JSON.stringify({...historyData}),
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    })
        .then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
        } else {
            alert(data.message);
        }
    })
};
// chapterName !!!
export const updateChapter = (chapterData) => (dispatch) => {
    fetch(`/api/history/${chapterData.historyId}/${chapterData.chapterId}`, {
        method: 'PATCH',
        body: JSON.stringify({...chapterData}),
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    })
        .then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(setHistory(data.history))
        } else {
            alert(data.err)
        }
    })
};
//
// export const getUser = (userId) => (dispatch) => {
//     fetch(`/api/users/${userId}`, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": localStorage.getItem('Authorization')
//         }
//     })
//         .then(response => response.json()).then(data => {
//         dispatch(setUser(data.user));
//     })
// };

export default historyReducer;