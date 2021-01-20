import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    //el useSelector devuelve el state del reducer de redux. recibe como parametro un callback (funcion)
    const {msgError} = useSelector(state => state.ui);
    //console.log(msgError);

    const [values, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    const {name, email, password, confirm} = values;

    const handleRegister = (e) => {
        e.preventDefault();
        //console.log(name, email, password, confirm);
        if(isValid()){
            //console.log("hola");
            dispatch(startRegisterWithEmailPassword(email, password, name));
        }
    };

    const isValid = () => {
        if(name.trim().length === 0){
            //console.log("name is required");
            dispatch(setError("name is required"));
            return false;
        }else if(!validator.isEmail(email)){
            //el validator es una libreria que nos sirve para validar el email que se digite
            //console.log("Email is not valid");
            dispatch(setError("Email is not valid"));
            return false;
        }else if(password !== confirm || password.length < 5){
            //console.log("Password shuold be at least 6 characters and match each other");
            dispatch(setError("Password shuold be at least 6 characters and match each other"));
            return false;
        }

        dispatch(removeError());

        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form>
                { 
                    msgError && 
                        (   
                            <div className="auth__alert-error">
                                {msgError}
                            </div>
                        )
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                />
                
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    className="auth__input"
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    value={confirm}
                    className="auth__input"
                    onChange={handleInputChange}
                />

                {/* El disabled deshabilita el boton */}
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    onClick={handleRegister}
                >
                    Register
                </button>

                <Link
                    to="/auth/login "
                    className="link"
                >
                    Already Register?
                </Link>
            </form>
        </>
    );
};
