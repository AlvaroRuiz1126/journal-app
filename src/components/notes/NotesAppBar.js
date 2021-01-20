import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes)

    const handleFileChange = (e) => {
        //console.log(e.target);
        const file = e.target.files[0];

        if(file){
            dispatch(startUploading(file));
        }
    };

    const handlePictureClick = () => {
        //console.log('Click');
        //esta linea simula elevento del clic con el id de fileSelector
        document.querySelector('#fileSelector').click();
    };

    const handleSave = () => {
        dispatch(startSaveNote(active));
    };

    return (
        <div className="notes__appbar">
            <span>26 de Octubre del 2020</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{display:"none"}}
                onChange={handleFileChange}
            />

            <div>
                <button 
                    className="btn"
                    onClick={handlePictureClick}
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
            
        </div>
    );
};
