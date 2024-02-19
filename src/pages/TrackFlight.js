import React, { useState } from "react";
import { Card, Row, Col, Input, Button, Form, Tag, Alert, Spin } from 'antd';
import { SearchFlightByReference } from "../actions/flightAction";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";

const TrackFlight = () => {
    const dispatch = useDispatch();
    const trackRecord = useSelector((state) => state.flightList.trackFlightRecord);
    const trackMessage = useSelector((state) => state.flightList.trackMessage);
    const loading = useSelector((state) => state.flightList.loading);
    const [form] = Form.useForm();

    const onCheck = async (e) => {
        e.preventDefault();
        try {
            const values = await form.validateFields();
            dispatch(SearchFlightByReference(values));
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const changeDateToTime = (dateTime) => {
        const dateObject = new Date(dateTime);
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const minuteToHour = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours} hrs ${minutes} min`;
    }

    const addMinute = (baseTime, minutesToAdd) => {
        const baseDateTime = new Date();
        const [hours, minutes] = baseTime.split(':');

        baseDateTime.setHours(parseInt(hours, 10));
        baseDateTime.setMinutes(parseInt(minutes, 10));

        const resultDateTime = new Date(baseDateTime.getTime() + minutesToAdd * 60000);

        const resultHours = resultDateTime.getHours();
        const resultMinutes = resultDateTime.getMinutes();

        return `${resultHours}:${resultMinutes < 10 ? '0' : ''}${resultMinutes}`;
    };


    return (
        <section>
            <Header />
            <Form layout="vertical" form={form}>
                <Card className="flight-card">
                    <h2>Search Flight Record</h2>
                    <Row gutter={16}>

                        <Col className="gutter-row" xs={16} sm={16} md={12} lg={12} xl={12}>
                            <Form.Item
                                name="booking_reference"
                                label="Booking Reference"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Booking Reference number.',
                                    },
                                ]}
                            >
                                <Input style={{ width: '100%' }} placeholder="Enter Booking Reference Number" />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" xs={8} sm={8} md={12} lg={12} xl={12}>
                            <span className="track-flight">
                                <Form.Item>
                                    <Button onClick={(e) => onCheck(e)}> Search Flight</Button>
                                </Form.Item>
                            </span>
                        </Col>
                    </Row>
                </Card>
            </Form>
            {loading && (
                <Spin tip="Loading">
                    <div className="content" />
                </Spin>
            )}
            {!loading && trackRecord && trackRecord != null && trackMessage == "Found" && (
                <>
                    <Card className="flight-result">
                        <Row gutter={16}>
                            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
                                <h2>Booking Reference : <span className="reference-number">{trackRecord?.booking_number}</span></h2>
                                <span className="user-label">First/Given Name:</span>
                                <span className="user-value">{trackRecord?.first_name}</span>
                                <br />
                                <span className="user-label">Surname/ Family Name:</span>
                                <span className="user-value">{trackRecord?.last_name}</span>
                                <br />
                                <span className="user-label">Address:</span>
                                <span className="user-value">{trackRecord?.address}</span>
                                <br />
                                <span className="user-label">Email:</span>
                                <span className="user-value">{trackRecord?.email}</span>
                                <br />
                                <span className="user-label">Phone Number:</span>
                                <span className="user-value">{trackRecord?.phone_number}</span>
                            </Col>

                            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
                            <main class="ticket-system">
                            
                            <div class="receipts-wrapper">
                                <div class="receipts">
                                    <div class="receipt">
                                    <h2>{trackRecord.airlines}</h2>
                                        <div class="route">
                                            <h2>{trackRecord.from}</h2>
                                            <svg class="plane-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510">
                                                <path fill="#3f32e5" d="M497.25 357v-51l-204-127.5V38.25C293.25 17.85 275.4 0 255 0s-38.25 17.85-38.25 38.25V178.5L12.75 306v51l204-63.75V433.5l-51 38.25V510L255 484.5l89.25 25.5v-38.25l-51-38.25V293.25l204 63.75z" />
                                            </svg>
                                            <h2>{trackRecord.to}</h2>
                                        </div>
                                        <div class="details">
                                            <div class="item">
                                                <span>Passanger</span>
                                                <h3>{trackRecord?.last_name}</h3>
                                            </div>
                                            <div class="item">
                                                <span>Flight No.</span>
                                                <h3>XXXXX</h3>
                                            </div>
                                            <div class="item">
                                                <span>Departure</span>
                                                <h3>{trackRecord.flight_date}</h3>
                                            </div>
                                            <div class="item">
                                                <span>Gate Closes</span>
                                                <h3>XXXXX</h3>
                                            </div>
                                            <div class="item">
                                                <span>Luggage</span>
                                                <h3>Hand Luggage</h3>
                                            </div>
                                            <div class="item">
                                                <span>Seat</span>
                                                <h3>XXXX</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="receipt qr-code">
                                        <svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.938 29.938">
                                            <path d="M7.129 15.683h1.427v1.427h1.426v1.426H2.853V17.11h1.426v-2.853h2.853v1.426h-.003zm18.535 12.83h1.424v-1.426h-1.424v1.426zM8.555 15.683h1.426v-1.426H8.555v1.426zm19.957 12.83h1.427v-1.426h-1.427v1.426zm-17.104 1.425h2.85v-1.426h-2.85v1.426zm12.829 0v-1.426H22.81v1.426h1.427zm-5.702 0h1.426v-2.852h-1.426v2.852zM7.129 11.406v1.426h4.277v-1.426H7.129zm-1.424 1.425v-1.426H2.852v2.852h1.426v-1.426h1.427zm4.276-2.852H.002V.001h9.979v9.978zM8.555 1.427H1.426v7.127h7.129V1.427zm-5.703 25.66h4.276V22.81H2.852v4.277zm14.256-1.427v1.427h1.428V25.66h-1.428zM7.129 2.853H2.853v4.275h4.276V2.853zM29.938.001V9.98h-9.979V.001h9.979zm-1.426 1.426h-7.127v7.127h7.127V1.427zM0 19.957h9.98v9.979H0v-9.979zm1.427 8.556h7.129v-7.129H1.427v7.129zm0-17.107H0v7.129h1.427v-7.129zm18.532 7.127v1.424h1.426v-1.424h-1.426zm-4.277 5.703V22.81h-1.425v1.427h-2.85v2.853h2.85v1.426h1.425v-2.853h1.427v-1.426h-1.427v-.001zM11.408 5.704h2.85V4.276h-2.85v1.428zm11.403 11.405h2.854v1.426h1.425v-4.276h-1.425v-2.853h-1.428v4.277h-4.274v1.427h1.426v1.426h1.426V17.11h-.004zm1.426 4.275H22.81v-1.427h-1.426v2.853h-4.276v1.427h2.854v2.853h1.426v1.426h1.426v-2.853h5.701v-1.426h-4.276v-2.853h-.002zm0 0h1.428v-2.851h-1.428v2.851zm-11.405 0v-1.427h1.424v-1.424h1.425v-1.426h1.427v-2.853h4.276v-2.853h-1.426v1.426h-1.426V7.125h-1.426V4.272h1.426V0h-1.426v2.852H15.68V0h-4.276v2.852h1.426V1.426h1.424v2.85h1.426v4.277h1.426v1.426H15.68v2.852h-1.426V9.979H12.83V8.554h-1.426v2.852h1.426v1.426h-1.426v4.278h1.426v-2.853h1.424v2.853H12.83v1.426h-1.426v4.274h2.85v-1.426h-1.422zm15.68 1.426v-1.426h-2.85v1.426h2.85zM27.086 2.853h-4.275v4.275h4.275V2.853zM15.682 21.384h2.854v-1.427h-1.428v-1.424h-1.427v2.851zm2.853-2.851v-1.426h-1.428v1.426h1.428zm8.551-5.702h2.853v-1.426h-2.853v1.426zm1.426 11.405h1.427V22.81h-1.427v1.426zm0-8.553h1.427v-1.426h-1.427v1.426zm-12.83-7.129h-1.425V9.98h1.425V8.554z" />
                                        </svg>
                                        <div class="description">
                                            <h2>{trackRecord?.first_name} {trackRecord?.last_name}</h2>
                                            <p>Show QR-code when requested</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                            </Col>
                        </Row>
                    </Card>
                </>

            )}
            {!loading && trackMessage === "Not Found" && (
                <Card className="flight-result">
                    <Alert message="Flight record not found using that Booking Reference" type="error" />
                </Card>
            )}

        </section>
    );
};

export default TrackFlight;