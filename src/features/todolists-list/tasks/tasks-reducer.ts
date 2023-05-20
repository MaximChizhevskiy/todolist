import { TasksStateType } from "features/todolists-list/todolists/Todolist/Todolist"
import { appActions } from "app/app-reducer"
import { todolistActions } from "features/todolists-list/todolists/todolists-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/action/common-actions"
import { ResultCode } from "common/enums/common-enums"
import { createAppAsyncThunk } from "common/utils"
import {
  AddTaskArgType,
  ChangeTaskModelType,
  ChangeTaskType,
  RemoveTaskArgType,
  tasksAPI,
  TaskType,
} from "features/todolists-list/tasks/tasks-api"

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId: string) => {
    const res = await tasksAPI.getTasks(todolistId)
    const tasks: TaskType[] = res.data.items
    return { tasks, todolistId }
  }
)

export const addTaskTC = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  "tasks/addTask",
  async (arg, { rejectWithValue }) => {
    const res = await tasksAPI.createTask(arg)
    if (res.data.resultCode === ResultCode.Success) {
      const task = res.data.data.item
      return { task }
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false })
    }
  }
)

export const changeTaskTC = createAppAsyncThunk<ChangeTaskType, ChangeTaskType>(
  "tasks/changeTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const state = getState()
    const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId)
    if (!task) {
      dispatch(appActions.setAppError({ error: "Task not found in the state" }))
      return rejectWithValue(null)
    }
    const apiModel: ChangeTaskModelType = {
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      startDate: task.startDate,
      priority: task.priority,
      status: task.status,
      ...arg.domainModel,
    }

    const res = await tasksAPI.changeTask(arg.todolistId, arg.taskId, apiModel)
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return arg
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true })
    }
  }
)

export const removeTaskTC = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>(
  "task/removeTask",
  async (arg, { rejectWithValue }) => {
    const res = await tasksAPI.deleteTask(arg)
    if (res.data.resultCode === ResultCode.Success) {
      return arg
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true })
    }
  }
)

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string; cb?: () => void }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    updateTask: (state, action: PayloadAction<{ taskId: string; model: ChangeTaskModelType; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      } else {
        return state
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(changeTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(todolistActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
  },
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions
export const tasksThunks = { fetchTasks, addTaskTC, changeTaskTC, removeTaskTC }
