import React, { useEffect, useState } from "react";
import homepageImage from "../assets/flight.jpg"
import { Card, Select, Row, Col, DatePicker, InputNumber, Button, Form, Tag,Divider } from 'antd';
import { GetFlightDestination, SearchFlightDetail,SearchFlightRecord } from "../actions/flightAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const destinationList = useSelector((state) => state.flightList.destinationData);
    const searchFlights = useSelector((state) => state.flightList.flightRecord);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [passenger, setPassenger] = useState(0);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(GetFlightDestination());
    }, []);
    const destinations = destinationList.map(item => ({
        value: item.id,
        label: item.destination,
    }));

    const handleSelectChange = (value, selectIndex) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = [...prevSelectedOptions];
            newSelectedOptions[selectIndex] = value;
            return newSelectedOptions;
        });
    };

    const getFilteredDestinations = (selectIndex) => {
        // Filter destinations based on the selected options in the other select
        return destinations.filter(
            (destination) => !selectedOptions.includes(destination.value) || selectedOptions.indexOf(destination.value) === selectIndex
        );
    };

    const onCheck = async (e) => {
        e.preventDefault();
        try {
            const values = await form.validateFields();
            dispatch(SearchFlightDetail(values));
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

      const handleInputChange = (value) => {
        setPassenger(value);
      };

      const bookFlight = (id,passenger) =>{
        console.log(passenger);
        dispatch(SearchFlightRecord(id,passenger));
        navigate('/book-flight');

      }
    
    return (
        <section>
            <div className="flight-image" style={{ height: '460px', width: '100vw', backgroundImage: `url(${homepageImage})`, backgroundSize: 'cover' }}>
              </div>
                <Form layout="vertical" form={form}>
                    <Card className="flight-card">
                        <h2>Book a flight</h2>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6} xs={12} sm={12} md={8} lg={8} xl={6}>
                                <Form.Item
                                    name="from"
                                    label="From"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please choose source destination.',
                                        },
                                    ]}
                                >
                                    <Select showSearch placeholder="Search Destination" style={{ width: '100%' }} allowClear
                                        filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                        options={getFilteredDestinations(0)}
                                        onChange={(e) => handleSelectChange(e, 0)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={6} xs={12} sm={12} md={8} lg={8} xl={6}>
                            <Form.Item
                                    name="to"
                                    label="To"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please choose final destination.',
                                        },
                                    ]}
                                >
                                <Select showSearch placeholder="Search Destination" style={{ width: '100%' }} allowClear
                                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    options={getFilteredDestinations(1)}
                                    onChange={(e) => handleSelectChange(e, 1)}
                                />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={6} xs={12} sm={12} md={8} lg={8} xl={6}>
                                <Form.Item
                                    name="flight_date"
                                    label="Departure"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please choose departure date.',
                                        },
                                    ]}
                                >
                                <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={6} xs={12} sm={12} md={8} lg={8} xl={6}>
                                <Form.Item
                                    name="passenger"
                                    label="Passenger"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter number of passenger.',
                                        },
                                    ]}
                                >
                                    <InputNumber onChange={handleInputChange} min={1} max={10} style={{ width: '100%' }} placeholder="Enter Number of Passenger" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="search-flight">
                        <Form.Item>
                            <Button onClick={(e)=>onCheck(e)}> Search Flight</Button>
                            </Form.Item>
                        </div>
                    </Card>
                </Form>
                { searchFlights  && searchFlights.map((item)=>{
                    return (
                        <Card className="flight-result" key={item.id}>
                            <Row gutter={16}>
                                <div>
                                    <h2>{item.airlines}</h2>
                                </div>
                                
                                <div className="destination-time">
                                    <h2>{changeDateToTime(item.flight_date)}</h2>
                                    <Tag color="red">{item.from}</Tag>
                                </div>
                                <Col className="gutter-row stop-card" span={6} xs={12} sm={12} md={8} lg={8} xl={6}>

                                {/* <div className="stop-card"> */}
                                    <hr className="stop-line"/>
                                    <Tag color="red" className="tag-line">
                                        {minuteToHour(item.flight_time)}
                                    </Tag>
                                {/* </div> */}
                                </Col>
                                <div className="destination-time">
                                    <h2>{addMinute(changeDateToTime(item.flight_date),item.flight_time)}</h2>
                                    <Tag color="red">{item.to}</Tag>
                                </div>
                                <div className="vertical-line"></div>
                                <div className="book-flight">
                                    <Button onClick={()=>bookFlight(item.id, passenger)}>Book Flight</Button>
                                </div>
                            </Row>
                        </Card>
                    )
                })

                }

        </section>
    );
};

export default Home;