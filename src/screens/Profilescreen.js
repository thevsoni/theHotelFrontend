import React, { useState, useEffect } from 'react'

import Loader from '../components/Loader';
import Error from '../components/Error';

import axios from 'axios';
import Axios from '../ApiCall/Axios';

import { Tabs } from 'antd'; //for tabs
import Swal from 'sweetalert2';//to show popup

import { useNavigate } from 'react-router-dom';

import { Tag, Divider } from 'antd'; //antd chips

const { TabPane } = Tabs; //in older version ,we were using this
//agar main aise const ko yaha likh du to iske niche lines pr koi bhi cheez import nahi kar skta


const Profilescreen = () => {

    let navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('currentuser'));
    useEffect(() => {
        if (!user) {
            // window.location.href = '/login';|
            navigate("/login")
        }
    }, [])

    const items = [
        {
            key: '1',
            label: `My Profile`,
            children:
                <>
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name:{user.name}</h1>
                    <h1>Email:{user.email}</h1>
                    <h1>isAdmin:{user.isAdmin ? "YES" : "NO"}</h1>

                </>
        },
        {
            key: '2',
            label: `My Bookings`,
            children: <MyBookings />,
        },
    ];
    return (
        <>

            {/* <div>
                <Tabs defaultActiveKey='1'>
                    <TabPane tab='Tab 1' key='1'>
                        Content of tab pane 1
                    </TabPane>
                    <TabPane tab='Tab 2' key='2'>
                        Content of tab pane 2
                    </TabPane>
                </Tabs>
            </div> */}
            {/* this is older version  */}

            <div className='ml-3 mt-3'>
                <Tabs defaultActiveKey="2" items={items} />
            </div>
        </>
    )
}

export default Profilescreen

//we can separate components for this also
export function MyBookings() {

    const user = JSON.parse(localStorage.getItem('currentuser'));

    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    // const [status, setstatus] = useState('cancelled'); //actually after doing cancel order,need to refresh a page
    //to see the cancellation so ye krna na pade isliye
    //i have to think ,how to implement this things actually

    useEffect(() => {
        async function func() {
            try {
                setloading(true);
                const data = (await Axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data;
                setloading(false);
                console.log(data)
                setbookings(data);
                console.log("success in profilescreen in my bookings")
            } catch (error) {
                console.log("error in profilescreen in MyBookings", error)
                setloading(false);
                seterror(true);
            }
        }
        func();
    }, [])

    async function cancelBooking(bookingid, roomid) {
        try {
            setloading(true)
            const result = (await Axios.post('/api/bookings/cancelbooking', { bookingid, roomid })).data
            setloading(false)
            console.log(result)
            Swal.fire('Congratulation', 'Your room cancelled Successfully', 'success').then(result => { window.location.reload() })

        } catch (error) {
            console.log(error)
            console.log("error in cancel booking frontend")
            setloading(false)
            seterror(true)
            Swal.fire('Oops', 'Something went wrong', 'error').then(result => { window.location.reload() })
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && <Loader />}
                    {bookings && bookings.map((booking, key) => {
                        return <div key={key} className='bs'>
                            {console.log(booking.room)}
                            <h1>{booking.room}</h1>
                            <p><b>Booking Id</b> : {booking._id}</p>
                            <p><b>Check In</b> : {booking.fromdate}</p>
                            <p><b>Check Out</b> : {booking.todate}</p>
                            <p><b>Amount</b> : {booking.totalamount}</p>
                            {/* <p><b>Status</b> : {booking.status === 'booked' ? 'CONFIRMED' : 'CANCELLED'}</p> */}
                            <p><b>Status</b> : {booking.status === 'booked' ? <Tag color='green'>CONFIRMED</Tag> : <Tag color='orange'>CANCELLED</Tag>}</p>


                            <div className="text-right">
                                {booking.status === 'booked' && <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>CANCEL BOOKING</button>}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}