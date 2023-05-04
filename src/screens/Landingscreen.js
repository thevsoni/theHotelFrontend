import React from 'react'
import { Link } from 'react-router-dom';

function Landingscreen() {
    return (
        <div className='row landing'>

            <div className="col-md-12 text-center">

                <h3 style={{ color: 'white', fontSize: '130px' }}>The Hotel</h3>
                <h2 style={{ color: 'white' }}>There is only one Boss, The Guest</h2>


                <Link to='/home'><button className='btn landingbtn'>Get Started</button></Link>
            </div>

        </div>
    )
}

export default Landingscreen