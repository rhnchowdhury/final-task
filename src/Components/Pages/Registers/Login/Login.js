import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BsFillChatTextFill } from "react-icons/bs";
import { AuthContext } from '../../../Context/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const handleLogin = (data, e) => {
        console.log(data)
        e.target.reset();
        setLoginError('');
        login(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user)
            })
            .catch(err => {
                setLoginError(err.message);
            });

    }

    return (
        <section style={{ background: '#dbeafe' }}>
            <div className='flex justify-center items-center'>
                <span ><BsFillChatTextFill className='h-8 w-10 shadow-current' style={{ color: '#2563eb' }}></BsFillChatTextFill></span>
                <p className='text-2xl font-bold'>ConnectMe</p>
            </div>
            <div className='flex justify-center items-center'>

                <div className='my-28 p-7 shadow-2xl bg-base-100'>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div>
                            <label className="label"><span className="label-text font-bold" style={{ color: "#675444" }}>Name</span></label>
                            <input type='text' {...register("name",
                                {
                                    required: "Name is required"
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.name && <p className='text-error'>{errors.name?.message}</p>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-bold" style={{ color: "#675444" }}>Email</span></label>
                            <input type='text' {...register("email",
                                {
                                    required: "Email address is required"
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                        </div>
                        <div>
                            <label className="label"><span className="label-text font-bold" style={{ color: "#675444" }}>Password</span></label>
                            <input type='password' {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password must be strong" }
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.password && <p className='text-error'>{errors.password?.message}</p>}
                            <label className="label"><span className="label-text" style={{ color: "#675444" }}>Forget password?</span></label>
                        </div>
                        <input className='btn w-full max-w-xs' style={{ background: "#675444" }} value='Login' type="submit" />
                        {loginError && <p className='text-error'>{loginError}</p>}
                        <p style={{ color: "#675444" }}>New to Artificial Pets? <Link to='/signup' className='text-error font-bold'>Create an account</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;