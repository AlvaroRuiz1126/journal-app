import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginWithEmailPassword } from '../../../actions/auth';
jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginWithEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null 
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en LoginScreen', () => {
    const warpper = mount(
        <MemoryRouter>
            {/* El provider es para proveer el store de thunk en el testing */}
            <Provider store={store}>
                <LoginScreen />
            </Provider>
        </MemoryRouter>
    );

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('Debe mostrarse el componente correctamente', () => {
        expect(warpper).toMatchSnapshot();
    });

    test('Debe disparar la accion de startGoogleLogin', () => {
        warpper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalled();
    });
    
    test('Debe desparar el startLogin con los respectivos argumentos', () => {
        warpper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(startLoginWithEmailPassword).toHaveBeenCalledWith('email@email.com', '123456');
    });
});