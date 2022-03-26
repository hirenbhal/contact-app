import "./App.css";
import { List,Avatar,Typography } from "antd";
import { useState, useEffect } from "react";

const { Title } = Typography;

const App = () => {
  const [data, setData] = useState([]);

  const dummy = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
    {
      title: "Title 5",
    },
    {
      title: "Title 6",
    },
  ];

  useEffect(() => {
    fetch("https://randomuser.me/api?results=10")
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData.results);
        console.log(data);

      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Title className="title">Contact App</Title>
      <List
      className="List"
       itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => <List.Item>
          <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="https://ant.design">{item.name.title} {item.name.first} {item.name.last} </a>}
          description={item.email}
        />
        </List.Item>}
      />
    </div>
  );
};

export default App;
