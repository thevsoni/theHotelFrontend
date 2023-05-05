import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Axios from '../ApiCall/Axios';
import { useParams } from 'react-router-dom';//to get params from url
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';

import StripeCheckout from 'react-stripe-checkout'; //stripe for payment integration but this is older version
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
//this new stripe ,how it works ,need to learn 

import Swal from 'sweetalert2';//to show payment successfull or failed

const Bookingscreen = () => {

    let navigate = useNavigate();

    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();

    const { roomid, fromdate, todate } = useParams();
    // const ufromdate = moment(fromdate).format('DD-MM-YYYY'); it gives error 
    // const utodate = moment(todate).format('DD-MM-YYYY');
    const ufromdate = moment(fromdate, 'DD-MM-YYYY');
    const utodate = moment(todate, 'DD-MM-YYYY');
    const totaldays = moment.duration(utodate.diff(ufromdate)).asDays() + 1;

    const [totalamount, settotalamount] = useState();


    //for stripe
    // stripe older version
    async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem("currentuser"))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }

        try {
            const result = await Axios.post('/api/bookings/bookroom', bookingDetails)
            console.log("success on bookroom in bookingscreen", result);
        } catch (error) {
            console.log("somethings error on bookroom in bookingscreen", error);
        }
    }

    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    // const stripePromise = loadStripe('pk_test_51MoVrqSJh1BoeGIOJgZS9AsoESkwk3joOgMQWMjhrg8qz2YiQ3zOAjEZ3qi7TSvNecIjsuQYKKFsHRZeo9MEUGe100A569VD7Q');
    // const options = {
    //     // passing the client secret obtained from the server
    //     // clientSecret: '{{CLIENT_SECRET}}',
    //     clientSecret: '{{sk_test_51MoVrqSJh1BoeGIOXsBgVlXqKA66WKcAF6gG3ATUCtwmi7SLdhm1yBGwFj7tFqgBoqJcOU0OQOCmlzXRr45Qspui00hEP22L8K}}',
    // };
    //need to learn this new version code how it works


    useEffect(() => {
        if (!localStorage.getItem('currentuser')) {
            // window.location.href = '/login'
            navigate("/login")
        }

        async function fetch() {
            try {
                setloading(true);
                const data = (await Axios.post("/api/rooms/getroombyid", { roomid: roomid })).data;
                setroom(data);
                settotalamount(data.rentperday * totaldays)
                // console.log(data);
                setloading(false);
            } catch (error) {
                setloading(false);
                seterror(true);
            }

        }
        fetch();
    }, [])

    //without payment mode i have to write this below code
    async function bookroom() {
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem("currentuser"))._id,
            fromdate,
            todate,
            totalamount,
            totaldays
        }

        try {
            setloading(true);
            const result = await Axios.post('/api/bookings/bookroom', bookingDetails)
            console.log("success on bookroom in bookingscreen", result);
            setloading(false);
            // Swal.fire('Congratulation', 'Your room booked Successfully', 'success').then(result => { window.location.href = '/profile' })
            Swal.fire('Congratulation', 'Your room booked Successfully', 'success').then(result => { navigate('/profile') })
        } catch (error) {
            console.log("somethings error on bookroom in bookingscreen", error);
            setloading(false);
            // Swal.fire('Oops', 'Something went wrong', 'error').then(result => { window.location.href = '/bookings' })
            Swal.fire('Oops', 'Something went wrong', 'error').then(result => { navigate('/profile') })

        }
    }



    return (
        <div>
            {
                // loading ? <Loader /> : error ? <Error /> : ()
                loading ? <Loader /> : room ? (
                    <div className='m-5'>
                        <div className="row justify-content-center mt-5 bs">
                            <div className="col-md-6">
                                <h1>{room.name}</h1>
                                <img src={room.imageurls[0]} alt="unable to load" className='bigimg' />
                            </div>
                            <div className="col-md-6" style={{ textAlign: "right" }}>
                                <h1>Booking details</h1>
                                <hr />
                                <div>
                                    <b>
                                        <p>Name: {JSON.parse(localStorage.getItem("currentuser")).name}</p>
                                        <p>from date: {fromdate}</p>
                                        <p>to date: {todate}</p>
                                        <p>max count: {room.maxcount}</p>
                                    </b>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <b>
                                        <h1>Amount</h1>
                                        <hr />
                                        <p>Total days: {totaldays}</p>
                                        <p>Rent per day: {room.rentperday}</p>
                                        {/* <p>Total Amount:{room.rentperday * totaldays}</p> */}
                                        <p>Total Amount:{totalamount}</p>
                                    </b>
                                </div>

                                <div style={{ float: "right" }}>

                                    <button className='btn btn-primary' onClick={bookroom}>pay now</button>
                                    {/* if i do not integrate payment option then simply create a pay now button  */}


                                    {/* for payment integration */}
                                    {/* stripe */}

                                    {/* <StripeCheckout token={onToken} */}
                                    {/* // amount={totalamount * 100} */}
                                    {/* // currency='INR' */}
                                    {/* // stripeKey="pk_test_51MoVrqSJh1BoeGIOJgZS9AsoESkwk3joOgMQWMjhrg8qz2YiQ3zOAjEZ3qi7TSvNecIjsuQYKKFsHRZeo9MEUGe100A569VD7Q"> */}
                                    {/* <button className='btn btn-primary'>pay now</button> */}
                                    {/* agar button nahi daale to automatic ek button daal deta hai */}
                                    {/* </StripeCheckout> */}
                                    {/* this code is of older version of stripe */}



                                    {/* <Elements stripe={stripePromise} options={options}> */}
                                    {/* <CheckoutForm /> */}
                                    {/* <form> */}
                                    {/* <PaymentElement /> */}
                                    {/* <button>Submit</button> */}
                                    {/* </form> */}
                                    {/* </Elements> */}
                                    {/* this new version i have to learn bcs now its not working */}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <Error />
            }
        </div>
    )
}

export default Bookingscreen