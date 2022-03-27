import "./MessageList.css";
import React, { useEffect, useState } from "react";
import { List, Typography } from "antd";

const { Title } = Typography;

const MessageList = () => {
  const [list, setList] = useState([]);

  //fetch list of messages when page renders
  useEffect(() => {
    fetch("http://localhost:4000/message-list")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //remove duplicates from message list
  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

  const newList = getUniqueListBy(list, "otp");

  return (
    <div className="list-container">
      {list.length ? (
        <>
          <Title style={{ marginBottom: "33px" }}>Sent Messages</Title>
          <List
            itemLayout="horizontal"
            dataSource={newList}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={`${item.name}  (OTP: ${item.otp})`}
                  description={item.date}
                />
              </List.Item>
            )}
          />
        </>
      ) : (
        <Title level={4}>No Messages</Title>
      )}
    </div>
  );
};

export default MessageList;
