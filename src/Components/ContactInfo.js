import "./ContactInfo.css";
import React, { useState } from "react";
import {
  Card,
  Typography,
  Divider,
  Button,
  Modal,
  Input,
  InputNumber,
  message,
} from "antd";

import { useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

const ContactInfo = () => {

  //to get parameters from state provided by Link (React-Router)
  const location = useLocation();
  const { name, phone, gender } = location.state;

  //States to handle TextBox Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  //values in the Modal
  const [inputValue, setInputValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [finalNumber, setFinalNumber] = useState("");

  //generate new OTP every time user clicks on send message
  const [OTP, setOTP] = useState(Math.floor(100000 + Math.random() * 900000));

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e);
    if (e) {
      let num = e.toString();
      setFinalNumber(num);
    }
  };

  const success = () => {
    message.success("Message Sent!");
  };

  const error = () => {
    message.error("Please Enter Verified and Valid Number");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
      name: `${name}`,
      OTP: `${OTP}`,
    };

    //send request to twilio with custom headers
    fetch(
      `http://localhost:4000/send?receiver=${finalNumber}&textMessage=Message:${inputValue}  OTP: ${OTP}`,
      { headers }
    );


    //check for verified number in the phoneNumber box
    if (finalNumber === "9521075741") {
      success();
      setIsModalVisible(false);
      setInputValue("");
      setPhoneNumber(null);
    } else {
      error();
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setOTP(Math.floor(100000 + Math.random() * 900000));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container">
      <Card
        className="contact-card"
        cover={
          <img
            alt="example"
            src={`https://joeschmoe.io/api/v1/${
              gender === "male" ? "jon" : "jess"
            }`}
          />
        }
        hoverable
        style={{ width: 240 }}
      >
        <Text strong>
          {name}
          <br />
        </Text>
        <Text>{phone}</Text>
        <Divider />
        <Button key="submit" type="primary" onClick={showModal}>
          Send Message
        </Button>
      </Card>
      <Modal
        title="Type a Message"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <React.Fragment key={OTP}>
            <Text strong>Hi, your OTP is: {OTP}</Text>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              Send Message
            </Button>
            ,
          </React.Fragment>,
        ]}
      >
        <TextArea rows={4} value={inputValue} onChange={handleInputValue} />
        <br />
        <InputNumber
          maxLength={10}
          value={phoneNumber}
          onChange={handlePhoneNumber}
          controls={false}
          prefix={<UserOutlined />}
          placeholder="Enter 10 digit phone number"
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
};

export default ContactInfo;
