import React, { useState } from "react";
import{BrowserRouter as Router,Route} from "react-router-dom"

import './App.css';
import AddPayment from "./components/AddPayment";
import AllPayment from "./components/AllPayment";

function App() {
      return(
         <Router>
           
         <div>
            <Route path = "/pay" exact component ={AddPayment} />
            <Route path = "/all" exact component={AllPayment} />

             
         </div>
         </Router>
      );
}
  
export default App;