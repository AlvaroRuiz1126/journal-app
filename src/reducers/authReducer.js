import { types } from "../components/types/types";

//creamos el reducer como normalmente lo hemos venido realizando, para el control de las acciones
export const authReducer = (state = {}, action) => {
    switch(action.type){
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.name
            };

        case types.logout:
            return {};
        
        default:
            return state;
    }
}