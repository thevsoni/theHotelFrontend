import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Room = ({ room, fromdate, todate }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div className='row bs'>
            <div className="col-md-4">
                <img src={room.imageurls[0]} alt="unable to load " className='smallimg' />
            </div>
            <div className="col-md-7">
                <h1>{room.name}</h1>
                <b>
                    <p>Max Count : {room.maxcount}</p>
                    <p>Phone Number : {room.phonenumber}</p>
                    <p>Type : {room.type}</p>
                </b>
                <div style={{ float: 'right' }}>
                    {/* {console.log(room._id)} */}

                    {(fromdate && todate) &&
                        // {/* <Link to={'/book/${room._id}'}> i was doing wrong here ,` ke place me ' laga rha tha*/ }
                        <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                            <button className='btn btn-primary m-2'>Book Now</button>
                        </Link>
                    }
                    <button className='btn btn-primary' onClick={handleShow}>view details</button>
                </div>
            </div>

            {/* this code is for modal popup */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel prevLabel='' nextLabel=''>
                        {
                            room.imageurls.map((url, key) => {
                                return <Carousel.Item key={key}>
                                    <img
                                        className="d-block w-100 bigimg"
                                        src={url}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            })
                        }

                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >

    )
}

export default Room