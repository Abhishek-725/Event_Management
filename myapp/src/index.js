import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from "react-dom";
import Counter from './Components/Counter';

const element = <h1> Hello  World! </h1>;
console.log(element);



ReactDOM.render(<Counter/>,document.getElementById("root"));
