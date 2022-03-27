import "./App.css";
import { List, Avatar, Typography } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const { Title } = Typography;

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api?results=10")
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <div className="navbar">
        <Title className="title">Contact App</Title>
        <Link className="message-link" to="/message-list">
          Messages List
        </Link>
      </div>
      {loading ? (
        <Title level={5} style={{ textAlign: "center" }}>
          Loading...
        </Title>
      ) : (
        <div className="list-component">
          <List
            className="List"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://joeschmoe.io/api/v1/${
                        item.gender === "male" ? "jon" : "jess"
                      }`}
                    />
                  }
                  title={
                    <Link
                      to="/contact-info"
                      state={{
                        name: ` ${item.name.title} ${item.name.first} ${item.name.last}`,
                        phone: `${item.cell}`,
                        gender: `${item.gender}`,
                      }}
                    >
                      {item.name.title} {item.name.first} {item.name.last}{" "}
                    </Link>
                  }
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default App;
