import React, { FC } from "react"
import { Button } from "@mui/material"
import { useActions } from "common/hooks"
import { todolistActions, TodolistDomainType } from "features/todolists-list/todolists/todolists-reducer"
import { FilterValuesType } from "features/todolists-list/todolists/Todolist/Todolist"

export const FilterTasksButtons: FC<Props> = ({ todolist }) => {
  const { changeFilter } = useActions(todolistActions)

  const changeFilterHandler = (filter: FilterValuesType) => {
    changeFilter({ filter, id: todolist.id })
  }

  return (
    <div>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "text"}
        onClick={() => {
          changeFilterHandler("all")
        }}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "text"}
        onClick={() => {
          changeFilterHandler("active")
        }}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        onClick={() => {
          changeFilterHandler("completed")
        }}
        color={"secondary"}
      >
        Completed
      </Button>
    </div>
  )
}

//types
type Props = {
  todolist: TodolistDomainType
}
