import '@testing-library/jest-dom';
import { types } from '../../components/types/types';
import { authReducer } from '../../reducers/authReducer';

describe('Pruebas del authReducer', () => {
    test('Retorna el estado inicial', () => {
        const loginState = {};
        const state = authReducer(loginState, {
            type: types.logininit,
            payload: {
                name: 'Alvaro',
                uid: 123456
            }
        });

        expect(state).toEqual(loginState);
    });

    test('Debe retornar el nombre y el id del usuario', () => {
        const loginState = {};
        const state = authReducer(loginState, {
            type: types.login,
            payload: {
                name: 'Alvaro',
                uid: 123456
            }
        });

        expect(state).toEqual({
            name: 'Alvaro',
            uid: 123456
        });
    });

    test('Debe retornar el nombre y el id del usuario', () => {
        const loginState = {};
        const state = authReducer(loginState, {
            type: types.logout,
            payload: {
                name: 'Alvaro',
                uid: 123456
            }
        });

        expect(state).toEqual(loginState);
    });
});