import {TasksStateType} from "../Todolist";

export const tasksReducer = (state:TasksStateType, action: removeTaskACType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return state
        }
        default: return state
    }
}

type removeTaskACType=ReturnType<typeof removeTaskAC>

export const removeTaskAC = () => {
  return{
      type: 'REMOVE-TASK',
      payload: {}
  } as const
}