import React from 'react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
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

describe('Pruebas en el Sidebar', () => {
    const wrapper = mount(
        <MemoryRouter>
            <Provider store={store}>
                <Sidebar />
            </Provider>
        </MemoryRouter>
    );

    test('Debe mostrar el componente correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe llamarse el logout', () => {
        wrapper.find('button').simulate('click');
        expect(startLogout).toHaveBeenCalled();
    });
    
    test('Debe llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNote).toHaveBeenCalled();
    });
});