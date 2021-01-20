import { db } from "../firebase/firebase-config";

export const loadNotes = async(uid) => {
    //.get() me permite obtener los valores dentre de la collection de firetore
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];
    //console.log(notesSnap);

    notesSnap.forEach(sanpHijo => {
        //console.log(sanpHijo.data());
        notes.push({
            id: sanpHijo.id,
            ...sanpHijo.data()
        });
    });

    //console.log(notes);
    return notes;
};