import React from "react";
import ReactDOM from "react-dom";
import PrintInfo from '../page/Dashboard2'

const App: React.FC = () => {
  return <div className="App">
    <PrintInfo name='hh' age={26} />
    </div>;
};

export default App;
