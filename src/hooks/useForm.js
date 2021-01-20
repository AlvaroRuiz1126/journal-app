import { useState } from "react";

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    //Para resetear los valores del formulario con los que uno quiera
    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    };

    const handleInputChange = ({target}) => {
        //console.log(target.name);
        setValues({
            ...values ,
            [target.name]: target.value
        });
    };

    return [values, handleInputChange, reset];
};