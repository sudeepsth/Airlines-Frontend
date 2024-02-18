import React, { useEffect, useState } from "react";
import { Steps, Card, Row, Col, Button } from 'antd';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";

const BookFinalize = () => {
    const navigate = useNavigate();
    const bookingStatus = useSelector((state) => state.flightList.bookingStatus);
    const passengerRecord = useSelector((state) => state.flightList.passengerRecord);

    useEffect(() => {
        if (bookingStatus == null)
            navigate('/');
    }, [bookingStatus]);
    return (
        <section>
            <Header />
            <Card className="flight-card">
                <h2>Your Detail</h2>
                <Steps
                    size="large"
                    current={2}
                    items={[
                        {
                            title: 'Search Flight',
                        },
                        {
                            title: 'Passengers',
                        },
                        {
                            title: 'Finalize',
                        },
                    ]}
                />
                <div className="flight-detail">
                    <Card>
                        <Row gutter={16}>
                            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h2>Booking Reference : <span className="reference-number">{passengerRecord?.booking_number}</span></h2>
                            </Col>
                            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h3>First/Given Name: {passengerRecord?.first_name}</h3>
                            </Col>
                            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h3>Surname/ Family Name: {passengerRecord?.last_name}</h3>
                            </Col>
                            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h3>Address:{passengerRecord?.address} </h3>
                            </Col>
                            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h3>Email:{passengerRecord?.email} </h3>
                            </Col>
                            <Col className="gutter-row" span={6} xs={12} sm={12} md={12} lg={12} xl={12}>
                                <h3>Email:{passengerRecord?.phone_number} </h3>
                            </Col>
                        </Row>
                        <Button onClick={() => navigate('/track-flight')}>Track Flight</Button>
                    </Card>

                </div>
            </Card>
        </section>
    );
};

export default BookFinalize;