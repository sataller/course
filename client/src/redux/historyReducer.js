import * as axios from "axios"
import socket from "../components/common/socket.io/socket";

const SET_HISTORIES = "network/auth/SET_HISTORIES";
const UPDATE_HISTORY = "network/auth/UPDATE_USERS";
const SET_HISTORY = "network/auth/SET_HISTORY";
const SET_UPDATED_HISTORY_ID = "network/auth/SET_UPDATED_HISTORY_ID";
const ADD_NEW_HISTORY = "network/auth/ADD_NEW_HISTORY";
const DELETE_HISTORY = "network/auth/DELETE_HISTORY";
const SET_DELETE_HISTORY_ID = "network/auth/SET_DELETE_HISTORY_ID";
const UPDATE_COMMENTS = "network/auth/UPDATE_COMMENTS";

let initialization = {
    histories: [],
    history: null,
    comments: null,
    selectedUsersId: [],
    userProfile: null,
    updatedHistoryId: null,
    deletedHistoryId: null,
};

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
                comments: action.history.comments,
            };
        case SET_UPDATED_HISTORY_ID:
            return {
                ...state,
                updatedHistoryId: action.id,
            };
        case SET_DELETE_HISTORY_ID:
            return {
                ...state,
                deletedHistoryId: action.id,
            };
        case ADD_NEW_HISTORY:
            return {
                ...state,
                histories: [...state.histories, action.history],
            };
        case DELETE_HISTORY:
            return {
                ...state,
                histories: state.histories.filter(i => i._id !== action.historyId),
            };
        case UPDATE_COMMENTS:
            return {
                ...state,
                comments: [...state.comments, action.comment],
            };
        default:
            return state
    }
}


export const initializeHistories = (histories) => ({type: SET_HISTORIES, histories});
export const refreshHistory = (history) => ({type: UPDATE_HISTORY, history});
export const setHistory = (history) => ({type: SET_HISTORY, history});
export const setUpdatedHistoryId = (id) => ({type: SET_UPDATED_HISTORY_ID, id});
export const setDeletedHistoryId = (id) => ({type: SET_DELETE_HISTORY_ID, id});
export const addNewHistory = (history) => ({type: ADD_NEW_HISTORY, history});
export const removeHistory = (historyId) => ({type: DELETE_HISTORY, historyId});
export const updateComments = (comment) => ({type: UPDATE_COMMENTS, comment});

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

export const createHistory = (historyData) => async (dispatch) => {
    fetch(`/api/history/create`, {
        method: 'POST',
        body: JSON.stringify({...historyData}),
        headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    })
        .then(response => response.json()).then(data => {
        if (data.resultCode === 0) {
            dispatch(addNewHistory(data.history));
            dispatch(setUpdatedHistory(data.history._id));
        } else {
            alert(data.message)
        }
    });
};

export const deleteHistory = (historyData) => async (dispatch) => {
    const response = await axios.delete(`/api/history/${historyData.historyId}`, {
        headers: {
            "Authorization": localStorage.getItem('Authorization')
        }
    });
    if (response.data.resultCode === 0) {
        dispatch(removeHistory(historyData.historyId));
        dispatch(setUpdatedHistory(historyData.historyId));
        dispatch(setDeletedHistory(historyData.historyId));
    } else {
        alert(response.data.message);
    }
};

export const createChapter = (historyData) => async (dispatch) => {
    const formData = new FormData();
    formData.append('image', historyData.file);
    formData.append('title', historyData.title);
    formData.append('id', historyData.historyId);

    const response = await axios.post(`/api/history/${historyData.historyId}/chapter`, formData, {
        headers: {
            "Authorization": localStorage.getItem('Authorization')
        }
    });
    if (response.data.resultCode === 0) {
        dispatch(setHistory(response.data.history));
        dispatch(setUpdatedHistoryId(historyData.historyId));
    } else {
        alert(response.data.message);
    }
};

export const deleteChapter = (chapterData) => (dispatch) => {
    fetch(`/api/history/${chapterData.historyId}/${chapterData.chapterId}`, {
        method: 'DELETE',
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

export const sendNewComment = (commentData) => (dispatch) => {
    socket.emit("COMMENT:ADD", commentData);
    let comment = {
        body: commentData.body,
        userId: commentData.userId,
        userName: commentData.userName,
    } ;
    dispatch(updateComments(comment));

};

export const addNewComment = (historyData) => (dispatch) => {
    if (historyData.resultCode === 0){
        dispatch(setHistory(historyData.updatedHistory));
    } else {
        alert("some error");
    }
};

export const setUpdatedHistory = (historyId) => (dispatch) => {
    dispatch(setUpdatedHistoryId(historyId));
};
export const setDeletedHistory = (historyId) => (dispatch) => {
    dispatch(setDeletedHistoryId(historyId));
};


export default historyReducer;