import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();
const note = {
    id: 1,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://local.jpg'
}

describe('Pruebas en JournalEntry', () => {
    const wrapper = mount(
        <MemoryRouter>
            <Provider store={store}>
                <JournalEntry {...note} />
            </Provider>
        </MemoryRouter>
    );

    test('Se debe mostrar el ocmponente correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Se debe llamar el activeNote', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenLastCalledWith(
            activeNote(note.id, {...note})
        );
    });
});