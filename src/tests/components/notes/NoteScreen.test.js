import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
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
        active: {
            id: '1234',
            title: 'Hola',
            body: 'Mundo',
            date: 0
        },
        notes: []
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en el componente NoteScreen', () => {
    const wrapper = mount(
        <MemoryRouter>
            <Provider store={store}>
                <NoteScreen />
            </Provider>
        </MemoryRouter>
    );

    test('Debe mostrar el componente correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe disparar el activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola alvaro'
            }
        });

        expect(activeNote).toHaveBeenLastCalledWith(
            "1234",
            {
                body: 'Mundo',
                title: 'Hola alvaro',
                id: "1234",
                date: 0
            }
        );
    });
});