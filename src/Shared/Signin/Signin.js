import { GoogleAuthProvider, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, useFirebaseAuth } from '../../context/AuthProvider';

const Signin = () => {

    const { createUser, googleSignIn } = useFirebaseAuth();
    const [signUpError, setSignUPError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = {
            name,
            email,
            password,
        }
        console.log(userInfo);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully.');

                updateProfile(auth.currentUser, {
                    displayName: name
                })

                
                
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
            
            navigate(from, { replace: true });
    }



    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignin = () => {
        googleSignIn(googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                // navigate(from, { replace: true });
            }).catch((error) => {
                console.error(error);
            })
    }




    return (
        <div>
            <div className='h-[800px] flex justify-center'>
                <div className='w-96 p-7 h-[560px] border-2'>
                    <h2 className='text-xl text-center'>Sign Up</h2>
                    <form onSubmit={handleSignUp}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Name</span></label>
                            <input type="text" name='name' className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input type="text" name='email' className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password" name='password' className="input input-bordered w-full max-w-xs" />
                        </div>
                        <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </form>
                    <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>

                </div>
            </div>
        </div>
    );

};

export default Signin;