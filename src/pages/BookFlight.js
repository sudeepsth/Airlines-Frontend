import React, { useEffect } from "react";
import { Steps, Card, Row, Col, Input, Button, Form, InputNumber } from 'antd';
import { BookPassengerFlight } from "../actions/flightAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";

const BookFlight = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const flightDetailId = useSelector((state) => state.flightList.searchRecord);
    const totalPassenger = useSelector((state) => state.flightList.passenger);
    const bookingStatus = useSelector((state) => state.flightList.bookingStatus);

    const [form] = Form.useForm();
    useEffect(() => {
        if (flightDetailId == null)
            navigate('/');
    }, [flightDetailId]);


    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            dispatch(BookPassengerFlight(values, flightDetailId, totalPassenger));
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };
    useEffect(() => {
        if (bookingStatus == 'success')
            navigate('/book-status');
    }, [bookingStatus]);


    return (
        <section>
            <Header />
            <Form layout="vertical" form={form}>
                <Card className="flight-card">
                    <h2>Enter Detail</h2>
                    <Steps
                        size="large"
                        current={1}
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
                                <Col className="gutter-row" span={6} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="first_name"
                                        label="First / Given name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your first name.',
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: '100%' }} placeholder="As written in the passport" />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={6} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="last_name"
                                        label="Surname / Family name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your surname.',
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: '100%' }} placeholder="As written in the passport" />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={6} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="address"
                                        label="Address"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your address.',
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={6} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            {
                                                required: true,
                                                type: 'email',
                                                message: 'Please enter your email.',
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={6} xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="phone_number"
                                        label="Phone Number"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your number.',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button onClick={() => onCheck()}>Pay</Button>
                            </Form.Item>
                        </Card>
                    </div>
                </Card>
            </Form>
        </section>
    );
};

export default BookFlight;