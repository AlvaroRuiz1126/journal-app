import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
//imprt del middleware de redux
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../components/types/types';
import { db } from '../../firebase/firebase-config';
jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() => {
        return 'https://hola-mundo.com/cosa.jpg';
    })
}));
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'NKO3gZwSoIvJX0GWwmCc',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}
//configuramos el store y realizamos un objeto parecido al que tenemos en la aplicacion con redux
let store = mockStore(initState);

describe('Pruebas con las actions de notes', () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test('Debe crear una nueva nota con startNewNote', async () => {
        await store.dispatch(startNewNote());
        //obtener las acciones que se disparan
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docID = actions[0].payload.id;
        await db.doc(`TESTING/journal/notes/${docID}`).delete();
    });

    test('Debe cargar las notas', async () => {
        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };

        expect(actions[0].payload[0]).toMatchObject(expected);
    });
    
    test('Debe actualizar la nora', async () => {
        const note = {
            id: 'NKO3gZwSoIvJX0GWwmCc',
            title: 'Nota actualizada desde testing',
            body: 'Hola nota actualizada desde testing'
        };
        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);

        const doc = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        expect(doc.data().title).toBe(note.title);
    });

    test('Debe actualizar el url del entry', async () => {
        const file = new File([], 'foto.jpg');
        await store.dispatch(startUploading(file));
        const doc = await db.doc('/TESTING/journal/notes/NKO3gZwSoIvJX0GWwmCc').get();

        expect(doc.data().url).toBe('https://hola-mundo.com/cosa.jpg');
    });
});