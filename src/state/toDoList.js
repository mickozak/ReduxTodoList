import {database} from "../firebase";
import auth from './auth'

const UPDATE_ARR = 'toDoList/UPDATE_ARR'
const ON_CHANGE = 'toDoList/ON_CHANGE'
const CLEAR = 'toDoList/CLEAR'
const FILTER = 'toDoList/FILTER'
const DELETE_TASK = 'toDoList/DELETE_TASK'

export const onChange = (newValue) => ({
    type: ON_CHANGE,
    newValue
})

export const updateArr = (newValue) => ({
    type: UPDATE_ARR,
    newValue
})

export const clear = () => ({type: CLEAR})

export const filter = (newFilterValue) => ({
    type: FILTER,
    newFilterValue
})

export const deleteTask = (index) => ({
    type: DELETE_TASK,
    index
})

export const addTask = () => (dispatch, getState) => {
    const state = getState()
    database.ref(`users/${auth.uid}/tasks`).set(state.todoList.tasks.concat(
        state.todoList.newText
    ))
}
export const updateAfterDelete = () => (dispatch, getState) => {
    const state = getState()
    database.ref(`users/${auth.uid}/tasks`).set(state.todoList.tasks)
}

export const initTasksSync = () => (dispatch, getState) => {
    database.ref(`users/${auth.uid}/tasks`).on(
        'value',
        (snapshot) => dispatch(
            updateArr(snapshot.val() || [])
        )
    )
}


const initialState = {
    newText: '',
    newFilter: '',
    tasks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ON_CHANGE:
            return {
                ...state,
                newText: action.newValue
            }
        case UPDATE_ARR:
            return{
                    ...state,
                    tasks: action.newValue
                }
        case CLEAR :
            return{
                ...state,
                newText: ''
            }
        case FILTER:
            return {
                ...state,
                newFilter: action.newFilterValue
            }
        case DELETE_TASK:
            return{
                ...state,
                tasks: state.tasks.filter((task, index) => index !== action.index )
            }
        default:
            return state
    }
}