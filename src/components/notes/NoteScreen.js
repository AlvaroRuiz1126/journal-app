import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes);
    //console.log(active);

    const [values, handleInputChange, reset] = useForm(active);
    //console.log(values);
    const {body, title, id} = values;

    //El useRef recibe una variable mutable que no va redibujar todo el componente si ella cambia
    const activeId = useRef(active.id);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    };

    //permite no crear un bucle infinito con la nota activa
    useEffect(() => {
        if(active.id !== activeId.current){
            reset(active);
            activeId.current = active.id;
        }
    }, [active, reset]);

    useEffect(() => {
        //console.log(values);
        dispatch(activeNote(values.id, {...values}));
    }, [values, dispatch]);

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    value={title}
                    name="title"
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happend today?"
                    className="notes__textarea"
                    value={body}
                    name="body"
                    onChange={handleInputChange}
                ></textarea>

                {
                    (active.url) &&
                    <div className="notes__image">
                        <img
                            src={active.url}
                            alt="Imagen"
                        />
                    </div>
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
};
