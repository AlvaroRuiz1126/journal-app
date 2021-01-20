import React, { useEffect, useState } from 'react';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from './../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
//import { loadNotes } from '../helpers/loadNotes';
import {
    //setNotes,
    startLoadingNotes 
} from '../actions/notes';
import {
    BrowserRouter as Router,
    Redirect,
    //Route,
    Switch,
} from "react-router-dom";

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        //el onAuthStateChanged regresa un objeto especial que se puede disparar mas de una vez
        firebase.auth().onAuthStateChanged(async(user) => {
            //se coloca el asynx-await por lo que esto es una promesa
            //console.log(user)
            if (user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                //llamamos la funcion aca porque es en el momento en que se tiene el id del usuario
                dispatch(startLoadingNotes(user.uid));
            }else{
                setIsLoggedIn(false);
            }

            setCheking(false);
        })
    }, [dispatch, setCheking, setIsLoggedIn]);
    //si no se tiene una dependencia en el effect, solo se dispara una vez

    if(cheking){
        return (<h1>Espere...</h1>);
    }
    //console.log(isLoggedIn);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRouter
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRouter
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
};
