import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Loader from '../components/Loader';
import Error from '../components/Error';

const Loginscreen = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');


    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    async function login() {
        const user = {
            email,
            password
        }
        console.log(user)

        try {
            setloading(true);
            const result = (await axios.post('/api/users/login', user)).data
            setloading(false);
            console.log(result)

            localStorage.setItem('currentuser', JSON.stringify(result));
            //we cant store array or object inside local storage so just converting object to string

            window.location.href = '/home';
        } catch (error) {
            console.log(error)

            setloading(false);
            seterror(true);
        }

    }
    return (
        <div>
            {loading && <Loader />}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">

                    {error && <Error message='invalid credentials' />}
                    <div className='bs'>
                        <h2>Login</h2>
                        <input type="email" className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

                        <button className='btn btn-primary mt-3' onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginscreen