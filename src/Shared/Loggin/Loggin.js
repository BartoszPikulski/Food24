import { GoogleAuthProvider } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../context/AuthProvider';

const Loggin = () => {
    const { signIn, googleSignIn } = useFirebaseAuth();
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const data = {
            email,
            password,
        }
        console.log(data);

        // setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success('Login Successfully');
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignin = () => {
        googleSignIn(googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            }).catch((error) => {
                console.error(error);
            })
    }
    return (
        <div>
            <div className="">
                <div className='h-[800px] flex justify-center'>
                    <div className='w-96 h-[560px] p-7 border-2'>
                        <h2 className='text-xl text-center'>Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Email</span></label>
                                <input name='email' type="text" className="input input-bordered w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs mb-5">
                                <label className="label"> <span className="label-text">Password</span></label>
                                <input name='password' type="password" className="input input-bordered w-full max-w-xs" />
                            </div>
                            
                            <input name='login' value="Login" className='btn btn-accent w-full'  type="submit" />
                            <div>
                                {loginError && <p className='text-red-600'>{loginError}</p>}
                            </div>
                        </form>
                        <p className='text-center'>Don't have an account? <Link className='text-secondary' to="/signup">Sign up</Link></p>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleSignin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loggin;