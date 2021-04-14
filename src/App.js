import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MessageList from "./components/messageList";
import CreateForm from "./components/createForm";
import UpdateForm from "./components/updateForm";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={MessageList} />
          <Route exact path="/new-message" component={CreateForm} />
          <Route exact path="/update-message/:id" component={UpdateForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
