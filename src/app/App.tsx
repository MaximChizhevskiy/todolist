import React, { useEffect } from "react"
import "./App.css"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { CircularProgress, Container, LinearProgress } from "@mui/material"
import TodolistsList from "../features/todolists-list/TodolistsList"
import { useAppSelector } from "./store"
import { RequestStatusType } from "app/app-reducer"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Login } from "features/login/Login"
import { Navigate, Route, Routes } from "react-router-dom"
import { authThunks } from "features/login/auth-reducer"
import { useActions } from "common/hooks"
import { selectIsLoggedIn } from "features/login/auth-selectors"

function App() {
  const { initializeApp, logOut } = useActions(authThunks)

  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.auth.isInitialized)
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)

  useEffect(() => {
    initializeApp({})
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  const logOutHandler = () => logOut({})

  return (
    <div className={"App"}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Todolist</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logOutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress color="secondary" />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"login"} element={<Login />} />
          <Route path={"/"} element={<TodolistsList />} />
          <Route path={"todolist"} element={<TodolistsList />} />
          <Route path={"404"} element={<h1 style={{ textAlign: "center" }}>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to={"404"} />} />
        </Routes>
      </Container>
      <ErrorSnackbar />
    </div>
  )
}

export default App
