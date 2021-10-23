import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLoginWithEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../components/types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

describe('Pruebas en el actions de auth', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test('Se debe crear la accion respectiva de login y logout', () => {
        const loginAction = login('1234567', 'Alvaro');
        const logoutAction = logout();
        
        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid: '1234567',
                name: 'Alvaro'
            }
        });

        expect(logoutAction).toEqual({
            type: types.logout
        });
    });

    test('Debe realizar el logout con el startLogout', async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });
        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test('Debe hacer el login con startLoginWithEmailandPassword', async () => {
        await store.dispatch(startLoginWithEmailPassword('test@testing.com', '123456'));
        const actions = store.getActions();
        
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'fjDHqfenLSPHINT3X4ZQpy96sC12',
                name: null
            }
        });
    });
});