import {types} from './../components/types/types';
import {firebase, googleAuthProvider} from './../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { noteCleaning } from './notes';

export const login = (uid, name) => {
    return {
        type: types.login,
        payload: {
            uid,
            name
        }
    };
};

export const startLoginWithEmailPassword = (email, password) => {
    return (dispatch) => {
        // setTimeout(() => {
        //     dispatch(login(123, 'alvaro'));
        // }, 3500);
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName));
                //se debe colocar dentro de la promesa porque si se coloca fuera se ejecuta de manera sincrona con el anterior dispatch
                dispatch(finishLoading());
            }).catch(e => {
                //console.log(e)
                dispatch(finishLoading());
                Swal.fire('Error', e.message, 'error');
            });
    };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({user}) => {
                await user.updateProfile({displayName: name});
                dispatch(login(user.uid, user.displayName));
                //console.log(user);
                //console.log(userCred);
                //dispatch(login(user.uid, user.displayName))
            })
            .catch(e => {
                //console.log(e)
                Swal.fire('Error', e.message, 'error');
            });
    };
};

export const startGoogleLogin = () => {
    //el Popup devuelve unas credenciales de usuario
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then(({user}) => {
            //console.log(userCred);
            dispatch(login(user.uid, user.displayName))
        });
    };
};

export const startLogout = () => {
    //esta funcion es asincrona ebido a que se debe esperar a que la accion se ejecute en firebase
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(noteCleaning());
    };
};

//esta funcion devuelve un objeto vacio para reestablecer las credenciales
export const logout = () => {
    return {
        type: types.logout
    };
};