import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MessageList from "./components/messageList";
import MessageForm from "./components/messageForm";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={MessageList} />
          <Route exact path="/new-message" component={MessageForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
