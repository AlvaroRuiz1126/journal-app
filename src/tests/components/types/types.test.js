import '@testing-library/jest-dom';
import { types } from '../../../components/types/types';

describe('Pruebas de los types de las acciones', () => {
    test('El objeto debe ser igual al objeto types', () => {
        const demoTypes = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',

            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',

            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',

            notesAddNew: '[NOTES] New Note',
            notesActive: '[NOTES] Set Active Note',
            notesLoad: '[NOTES] Load Note',
            notesUpdated: '[NOTES] Updated Note',
            notesFileURL: '[NOTES] Updated Image URL',
            notesDelete: '[NOTES] Delete Note',
            notesLogoutCleaning: '[NOTES] Logout Cleaning'
        };

        expect(demoTypes).toEqual(types);
    });
});