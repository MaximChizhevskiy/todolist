import React, { FC } from "react"
import { EditableSpan } from "common/components"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { useActions } from "common/hooks"
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/todolists/todolists-reducer"

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks)

  const removeTodolistCallback = () => {
    removeTodolist(todolist.id)
  }
  const changeTitleTodolistCallback = (title: string) => {
    changeTodolistTitle({ todolistId: todolist.id, title })
  }

  return (
    <div style={{ position: "relative", padding: "5px" }}>
      <h3>
        <EditableSpan
          titleTask={todolist.title}
          onChange={changeTitleTodolistCallback}
          disabled={todolist.entityStatus === "loading"}
        />

        <IconButton
          onClick={removeTodolistCallback}
          disabled={todolist.entityStatus === "loading"}
          style={{ position: "absolute", top: "-15px", right: "1px" }}
        >
          <Delete color={"disabled"} />
        </IconButton>
      </h3>
    </div>
  )
}

//types
type Props = {
  todolist: TodolistDomainType
}
