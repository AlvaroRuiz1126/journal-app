import '@testing-library/jest-dom';
import { fileUpload } from '../../helpers/fileUpload';
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'depstfg0u', 
    api_key: '287489316851868', 
    api_secret: 'TYnapEWu-TZhlqePewL43QqT-Ik',
    secure: true
});

describe('Pruebas en FileUpload', () => {
    test('Debe cargar un archivo y retornar un url', async (done) => {
        const resp = await fetch('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg');
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jng');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        //Borrar imagen por su id
        //separamos el url por los / para asi extraer su id
        const segments = url.split('/');
        //almacenamos el id en una variable, ademas le eliminamos la extension
        const imgID = segments[segments.length - 1].replace('.jpg', '');
        //usamos la api de claudinary
        cloudinary.v2.api.delete_resources(imgID, {}, () => {
            done();
        });
    });

    test('Debe retornar un error', async () => {
        const file = new File([], 'foto.jng');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});