import logo from "./logo.svg";
import "./App.css";
import { Switch,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import 'antd/dist/antd.min.css';
import CompanyDetail from "./pages/CompanyDetail";


function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:id" component={CompanyDetail} />
      </Switch>
    </>
  );
}

export default App;
