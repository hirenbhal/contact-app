import App from "./App";
import ContactInfo from "./ContactInfo";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MessageList from "./MessageList";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App/>} />
        <Route path="/contact-info" element={<ContactInfo/>} />
        <Route path="/message-list" element={<MessageList/>} />
      </Routes>
    </Router>
  );
};

export default Navigation;
