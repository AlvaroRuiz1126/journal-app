import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import thunk from 'redux-thunk';
import { notesReducer } from '../reducers/notesReducer';

//esta linea viene de la documentacion de redux devtools. Esto permite poder utilizar la extension de redux y ademas los middlewares
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//este es el archivo de la fuente unica de verdad, aca se almacenan todos los reducers que contorlaran todas las acciones
//primero declaramos el combineReducers para poder pasar varios reducers a la funciones createStore
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});
//esta funcion crea el store con los reducers que se implementaran en la aplicacion. Recibe solo reducers
export const store = createStore(
    reducers,
    //se comenta porque ya tenemos el composeEnhancer
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeEnhancers(
        //habilita los middlewares
        applyMiddleware(thunk)
    )
);