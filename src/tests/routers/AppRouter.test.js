import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase-config';
jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null 
    },
    notes: {
        active: {},
        notes: []
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en el AppRouter', () => {
    test('Debe llamar el login si estoy autenticado', async () => {
        let user;

        await act( async () => {
            const userCredentials = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCredentials.user;
            const warpper = mount(
                <Provider store={store}>
                    {/* El provider es para proveer el store de thunk en el testing */}
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(login).toHaveBeenCalled();
        expect(login).toHaveBeenCalledWith('fjDHqfenLSPHINT3X4ZQpy96sC12', null);
    });
});