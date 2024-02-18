import React, { useEffect, useState } from "react";
import homepageImage from "../assets/flight.jpg"
import { Card, Row, Col, Input, Button, Form, Tag,Alert } from 'antd';
import { SearchFlightByReference } from "../actions/flightAction";
import { useDispatch, useSelector } from "react-redux";

const TrackFlight = () => {
    const dispatch = useDispatch();
    const trackRecord = useSelector((state) => state.flightList.trackFlightRecord);
    const trackMessage = useSelector((state) => state.flightList.trackMessage);
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

    const changeDateToTime = (dateTime) =>{
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
            <div className="flight-image" style={{ height: '460px', width: '100vw', backgroundImage: `url(${homepageImage})`, backgroundSize: 'cover' }}>
              </div>
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
                                <Button onClick={(e)=>onCheck(e)}> Search Flight</Button>
                            </Form.Item>
                            </span>
                            </Col>
                        </Row>
                    </Card>
                </Form>
                {trackRecord && trackRecord !=null && trackMessage=="Found" && (
                    <>
                    <Card className="flight-result">
                        <h2>Flight Detail:</h2>
                            <Row gutter={16}>
                                <div>
                                    <h2>{trackRecord.airlines}</h2>
                                </div>
                                
                                <div className="destination-time">
                                    <h2>{changeDateToTime(trackRecord.flight_date)}</h2>
                                    <Tag color="red">{trackRecord.from}</Tag>
                                </div>
                                <Col className="gutter-row stop-card" span={6} xs={12} sm={12} md={8} lg={8} xl={6}>

                                {/* <div className="stop-card"> */}
                                    <hr className="stop-line"/>
                                    <Tag color="red" className="tag-line">
                                        {minuteToHour(trackRecord.flight_time)}
                                    </Tag>
                                {/* </div> */}
                                </Col>
                                <div className="destination-time">
                                    <h2>{addMinute(changeDateToTime(trackRecord.flight_date),trackRecord.flight_time)}</h2>
                                    <Tag color="red">{trackRecord.to}</Tag>
                                </div>
                            </Row>
                        </Card>
                        <Card className="flight-result">
                    <Row gutter={16}>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>Booking Reference : <span className="reference-number">{trackRecord?.booking_number}</span></h2>
                    </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h3>First/Given Name: {trackRecord?.first_name}</h3>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h3>Surname/ Family Name: {trackRecord?.last_name}</h3>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h3>Address:{trackRecord?.address} </h3>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h3>Email:{trackRecord?.email} </h3>
                        </Col>
                        <Col className="gutter-row" span={6} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <h3>Email:{trackRecord?.phone_number} </h3>
                        </Col>
                    </Row>
                    </Card>
                   
                    </>
                        
                )}
                { trackMessage ==="Not Found" && (
                    <Card className="flight-result">
                    <Alert message="Flight record not found using that Booking Reference" type="error" />
                    </Card>
                )}

              

            

        </section>
    );
};

export default TrackFlight;