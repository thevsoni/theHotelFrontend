import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Axios from '../ApiCall/Axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import 'antd/dist/reset.css';

import moment from 'moment';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker; //i can write also this inside function Homescreen
// import 'antd/dist/antd.css'; it is not working


const Homescreen = () => {


    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();

    const [duplicaterooms, setduplicaterooms] = useState([]);

    const [searchkey, setsearchkey] = useState('');
    const [type, settype] = useState('');

    //if i do not want to show my room data without login
    /*
    useEffect(() => {
        console.log("updating")
        if (localStorage.getItem('currentuser')) {

            async function fetchData() {
                try {
                    setloading(true);
                    const data = (await axios.get('/api/rooms/getallrooms')).data
                    // console.log(data)
                    //firstly we will get a object and inside there my data is inside data so use like above 
                    setrooms(data)
                    setduplicaterooms(data)
                    setloading(false);
                } catch (error) {
                    seterror(true);
                    // console.log(error);
                    setloading(false);
                }
            }
            fetchData();
        }
        else {
            window.location.href = '/login'
        }
    }, [])
    */
    //if i want to show my room data without login
    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                // const data = (await axios.get('/api/rooms/getallrooms')).data
                const data = (await Axios.get('/api/rooms/getallrooms')).data
                // console.log(data)
                //firstly we will get a object and inside there my data is inside data so use like above 
                setrooms(data)
                setduplicaterooms(data)
                setloading(false);
            } catch (error) {
                seterror(true);
                // console.log(error);
                setloading(false);
            }
        }
        fetchData();
    }, [])


    function filterByDate(dates) {

        if (!dates) {
            setrooms(duplicaterooms);
            return;
        }

        // console.log(dates) //its format is not good so using moment ,inside this 2 size of array,there is object where $d represents date 
        // console.log(moment(dates[0].$d))
        // console.log(moment(dates[1].$d))
        console.log(moment(dates[0].$d).format('DD-MM-YYYY'))
        console.log(moment(dates[1].$d).format('DD-MM-YYYY'))


        setfromdate(moment(dates[0].$d).format('DD-MM-YYYY'))
        settodate(moment(dates[1].$d).format('DD-MM-YYYY'))

        //now code for date filter.if my room is already booked then dont show this
        var temprooms = [];
        var availibility = false;

        for (const room of duplicaterooms) {
            if (room.currentbookings.length > 0) {
                for (const booking of room.currentbookings) {
                    console.log(booking)
                    if (
                        !moment(moment(dates[0].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                        &&
                        !moment(moment(dates[1].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                    ) {
                        if (
                            moment(dates[0].$d).format('DD-MM-YYYY') !== booking.fromdate
                            &&
                            moment(dates[0].$d).format('DD-MM-YYYY') !== booking.todate
                            &&
                            moment(dates[1].$d).format('DD-MM-YYYY') !== booking.fromdate
                            &&
                            moment(dates[1].$d).format('DD-MM-YYYY') !== booking.todate
                        ) {
                            availibility = true;
                        }
                    }
                }
            }

            if (availibility === true || room.currentbookings.length === 0) {
                temprooms.push(room);
            }

        }
        setrooms(temprooms);

    }

    function filterBySearch() {
        const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()));
        setrooms(temprooms);
    }

    function filterByType(e) {
        // settype(e);
        if (e === 'all') {
            setrooms(duplicaterooms);
        }
        else {
            const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() === e.toLowerCase());
            setrooms(temprooms);
        }
    }
    return (
        <div className='container'>
            <div className="row mt-5 bs">

                {/* date filter */}
                <div className="col-md-3">
                    {/* <Space direction="vertical" size={12}> */}
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                    {/* </Space> */}
                </div>

                {/* serach room by name filter */}
                <div className="col-md-3">
                    <input type="text" className='form-control' placeholder='search rooms' value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch} />
                </div>

                <div className="col-md-3">

                    {/* <select className='form-control' value={type} onChange={(e) => { console.log(e.target.value); filterByType(e.target.value) }}> */}
                    {/* i have doubt in this above code bcs below code is working fine already  if write this above code then 
                        inside filterbytype function i hve to write settype(e) */}

                    <select className='form-control' onChange={(e) => { filterByType(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>

            </div>
            <div className='justify-content-center mt-5'>
                {/* {loading ? <Loader /> : error ? <Error /> : (rooms.map((room, key) => { } it will also work*/}
                {loading ? <Loader /> : (rooms.map((room, key) => {
                    return <div key={key} className="col md-9 mt-2">
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>
                }))
                }
            </div>
        </div>
    )
}

export default Homescreen