import Swal from 'sweetalert2';
import { types } from "../components/types/types";
import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
//react-journal
//Tarea asincrona ya que se hace la peticion en la base de datos de firebase
export const startNewNote = () => {
    return async(dispatch, getState) => {
        //para grabar en firestore se necesita el uid
        //con la funcion getState se obtiene el state del redux, muy perecido al useSelector
        const uid = getState().auth.uid;
        //console.log(uid);
        const note = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        //con esta instruccion se inserta en la base de datos de firestore
        const doc = await db.collection(`${uid}/journal/notes`).add(note);
        //console.log(doc);
        //esta accion recibe el id que se crea qn firestore que viene en doc.id, y la nota que se le envia
        dispatch(activeNote(doc.id, note));
        dispatch(addNewNote(doc.id, note));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid;
        if(!note.url){
            delete note.url;
        }
        //se le hace un clon al objeto que llega para no modificar el id de la nota cuando se va actualizar
        const noteToFirestore = {...note};
        //elmina la propiedad id del objeto, para eso sirve el delete
        delete noteToFirestore.id;
        //aca en la url del dc usamos el id de la nota que llega ocmo parametro
        //el .update(dato a almacenar) es la funcion para acutalizar
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');
    };
};

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = (file) => {
    return async(dispatch, getState) => {
        const {active} = getState().notes;
        Swal.fire({
            title: 'Uploadin...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
        //console.log(active, file);
        const fileURL = await fileUpload(file);
        //console.log(fileURL);
        active.url = fileURL;

        dispatch(startSaveNote(active));
        Swal.close();
    };
};

export const startDeleting = (id) => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    };
};

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteCleaning = () => ({
    type: types.notesLogoutCleaning
});