import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'; //for tabs

import axios from 'axios';

import Loader from '../components/Loader';
import Error from '../components/Error';

import Swal from 'sweetalert2';//to show popup


const Adminscreen = () => {

    useEffect(() => {
        // if (!(JSON.parse(localStorage.getItem('currentuser')))) {
        //     window.location.href = '/';
        // }
        if (!(JSON.parse(localStorage.getItem('currentuser')).isAdmin)) {
            window.location.href = '/';
        }
    }, [])

    const items = [
        {
            key: '1',
            label: `Bookings`,
            children: <Bookings />

        },
        {
            key: '2',
            label: `Rooms`,
            children: <Rooms />,
        },
        {
            key: '3',
            label: `Add Rooms`,
            children: <Addroom />,
        },
        {
            key: '4',
            label: `Users`,
            children: <Users />,
        },
    ];

    return (
        <div className='ml-3 mt-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '13px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default Adminscreen

//we can make diff diff components for all the things but it doesnt have much code so we can code here as well

//admin:get all Bookings
export function Bookings() {

    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        async function func() {
            try {
                const data = (await axios.get('/api/bookings/getallbookings')).data
                setbookings(data);
                setloading(false);
            } catch (error) {
                console.log("error in frontend in adminscreen in Bookings ", error)
                setloading(false);
                seterror(true);
            }
        }
        func();
    }, [])
    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Bookings</h1>
                {loading && <Loader />}

                {bookings && <div>There are total : {bookings.length} bookings</div>}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length && bookings.map((booking, key) => {
                            return <tr key={key}>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.roomid}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {error && <Error />}
            </div>
        </div>
    )
}

//admin:get all rooms
export function Rooms() {

    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        async function func() {
            try {
                const data = (await axios.get('/api/rooms/getallrooms')).data
                setrooms(data);
                console.log(data)
                setloading(false);
            } catch (error) {
                console.log("error in frontend in adminscreen in rooms ", error)
                setloading(false);
                seterror(true);
            }
        }
        func();
    }, [])
    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Rooms</h1>
                {loading && <Loader />}

                {rooms && <div>There are total : {rooms.length} rooms</div>}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Room Id</th>
                            <th>room name</th>
                            <th>Type </th>
                            <th>rent per day</th>
                            <th>phone number</th>
                            <th>Description</th>
                            <th>image : </th>

                        </tr>
                    </thead>

                    <tbody>
                        {rooms.length && rooms.map((room, key) => {
                            return <tr key={key}>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.phonenumber}</td>
                                <td>{room.description}</td>
                                <td><img src={room.imageurls[0]} style={{ height: '200px', width: '200px' }} alt='unable to show' /></td>

                            </tr>
                        })}
                    </tbody>
                </table>

                {error && <Error />}
            </div>
        </div>
    )
}

//admin: get all users
export function Users() {

    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        async function func() {
            try {
                const data = (await axios.get('/api/users/getallusers')).data
                console.log(data)
                setusers(data);
                setloading(false);
            } catch (error) {
                console.log("error in frontend in adminscreen in users ", error)
                setloading(false);
                seterror(true);
            }
        }
        func();
    }, [])
    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Users</h1>
                {loading && <Loader />}

                {users.length && <div>There are total : {users.length} users</div>}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>user Id</th>
                            <th>user name</th>
                            <th>Email </th>
                            <th>isAdmin</th>
                            <th>Created At </th>
                            <th>Last Updated </th>

                        </tr>
                    </thead>

                    <tbody>
                        {console.log("1")}
                        {users && users.map((user, key) => {
                            return <tr key={key}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin == false ? "false" : "true"}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.updatedAt}</td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {error && <Error />}
            </div>
        </div>
    )
}


//admin: add room component

export function Addroom() {

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    const [name, setname] = useState();
    const [rentperday, setrentperday] = useState();
    const [maxcount, setmaxcount] = useState();
    const [description, setdescription] = useState();
    const [phonenumber, setphonenumber] = useState();
    const [type, settype] = useState();
    const [imageurl1, setimageurl1] = useState();
    const [imageurl2, setimageurl2] = useState();
    const [imageurl3, setimageurl3] = useState();

    async function addRoom() {
        const newroom = {
            name,
            rentperday,
            maxcount,
            phonenumber,
            type,
            description,
            imageurls: [imageurl1, imageurl2, imageurl3]
        }

        try {
            setloading(true)
            const result = (await axios.post('/api/rooms/addroom', newroom)).data
            setloading(false)
            Swal.fire('Congratulation', 'Your room added Successfully', 'success')

        } catch (error) {
            console.log("error in adminscreen in addroom ", error)
            setloading(false)
            seterror(true)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }
    }
    return (
        <>
            <h1>Add Rooms</h1>
            {loading && <Loader />}
            <div className='row'>
                <div className="col-md-5">
                    <input type="text" className='form-control' placeholder='room name' value={name} onChange={(e) => { setname(e.target.value) }} />
                    <input type="text" className='form-control' placeholder='rent per day' value={rentperday} onChange={(e) => { setrentperday(e.target.value) }} />
                    <input type="text" className='form-control' placeholder='max count' value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }} />
                    <input type="text" className='form-control' placeholder='description' value={description} onChange={(e) => { setdescription(e.target.value) }} />
                    <input type="text" className='form-control' placeholder='phone number' value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} />
                </div>
                <div className="col-md-5">
                    <input type="text" className='form-control' placeholder='type' value={type} onChange={(e) => { settype(e.target.value) }} />
                    <input type="text" className='form-control' placeholder='img url 1' value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }} />
                    <input type="text" className='form-control' placeholder='img url 2' value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }} />
                    <input type="text" className='form-control' placeholder='img url 3' value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }} />

                    <div className="text-right">
                        <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>
                    </div>
                </div>
            </div>
        </>
    )
}
