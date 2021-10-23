import '@testing-library/jest-dom';
import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';
import { types } from '../../components/types/types';

describe('Pruebas en uiActions', () => {
    test('Pruebas de todas las acciones síncronas', () => {
        const setErrorAction = setError('Error!!!!');
        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading()

        expect(setErrorAction).toEqual({
            type: types.uiSetError,
            payload: 'Error!!!!'
        });
        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError,
        });
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading,
        });
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading,
        });
    }); 
});