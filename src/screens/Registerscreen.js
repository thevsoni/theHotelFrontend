import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Axios from '../ApiCall/Axios';


import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

import { useNavigate } from 'react-router-dom';

const Registerscreen = () => {

    let navigate = useNavigate();

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            console.log(user)
            try {
                setloading(true);
                const result = (await Axios.post('/api/users/register', user)).data
                setloading(false);
                setsuccess(true);

                // console.log(result)

                setname('');
                setemail('');
                setpassword('');
                setcpassword('');
                localStorage.setItem('currentuser', JSON.stringify(result));
                // window.location.href = "/home"
                navigate("/home")
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(false)
            }
        }
        else {
            alert("pwd not matched");
        }
    }
    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {success && (<Success message='registration successful' />)}
                    <div className='bs'>
                        <h2>Register</h2>
                        <input type="text" className='form-control' placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="email" className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input type="password" className='form-control' placeholder='confirm password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />

                        <button className='btn btn-primary mt-3' onClick={register}>submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registerscreen