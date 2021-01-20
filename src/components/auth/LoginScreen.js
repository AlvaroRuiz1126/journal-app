import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginWithEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    const [values, handleInputChange] = useForm({
        email: 'email@email.com',
        password: '123456'
    });

    const {email, password} = values;

    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.ui);

    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(email, password);
        //dispatch(login(12345, 'Alvaro'));
        dispatch(startLoginWithEmailPassword(email, password));
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form 
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn"
            >
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

                {/* El disabled deshabilita el boton */}
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create New Account
                </Link>
            </form>
        </>
    );
};
