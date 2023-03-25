import React, {useEffect} from 'react'
import './App.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, LinearProgress} from "@mui/material";
import TodolistsList from "../features/TodolistsList/TodolistsList";
import {useAppSelector} from "./store";
import {RequestStatusType} from "./api-reducer";
import {CustomizedSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


function App() {
    const  status = useAppSelector<RequestStatusType>((state) => state.app.status)
    useEffect(() => {
        console.log('Status changed ', status)
    }, [status])
    return (
        <div className={'App'}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
            <CustomizedSnackbar/>
        </div>
    )
}

export default App;

