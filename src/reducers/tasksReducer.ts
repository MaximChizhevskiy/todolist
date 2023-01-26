import {TasksStateType} from "../Todolist";

export const tasksReducer = (state:TasksStateType, action: tasksReducerType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return state
        }
        default: return state
    }
}

type tasksReducerType = removeTaskACType

type removeTaskACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC = () => {
  return{
      type: 'REMOVE-TASK',
      payload: {}
  } as const
}