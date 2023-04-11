import { createAction } from '@reduxjs/toolkit'

export const clearTasksAndTodolists = createAction<number | undefined>('common/clear-tasks-todolists')