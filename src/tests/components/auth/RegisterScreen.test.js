import React from 'react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../components/types/types';

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
//store.dispatch = jest.fn();

describe('Pruebas en el RegisterScreen', () => {
    const wrapper = mount(
        <MemoryRouter>
            <Provider store={store}>
                <RegisterScreen />
            </Provider>
        </MemoryRouter>
    );
    
    test('Debe mostrarse correctamnete', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe hacer el dispatch de la accion respectiva', () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: {
                name: 'email',
                value: '',
            }
        });

        wrapper.find('form').simulate('submit');

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });
    });
    
    test('Debe mostrar la caja de alerta con el error', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'email no es correcto' 
            }
        };
        const store = mockStore(initState);
        const wrapper = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <RegisterScreen />
                </Provider>
            </MemoryRouter>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);
    });
});