import React,{useState} from "react";
import axios from 'axios';
import "./AddPayment.css";



export default function AddPayment(){

    const [NameOnCard,setnameonCard] = useState("");
    const[CardNumber,setcardNUmber] = useState("");
    const [ExpiryDate,setexpiryDate] = useState("");
    const [CcvNumber,setccvNumber] = useState("");

     function sendPayment(e){
         e.preventDefault();
          

         const newPayment = {
             NameOnCard,
             CardNumber,
             ExpiryDate,
             CcvNumber
         }

         axios.post("http://localhost:5000/payment/add",newPayment).then(() =>{
             alert("Payment Added")
         }).catch((err) =>{
             alert(err)
         })

     } 


    return(
          
        <div className="container">
         <div className="body">
          <form onSubmit={sendPayment}>
            <div class="form-row" >
              <div class="form-group col-md-6">
              <h1>Payment</h1>
        <label for="Name">Name On Card</label>
        <input type="text" class="form-control" id="Name" 
             onChange={(e)=>{
             setnameonCard(e.target.value);
          }}
      />
    </div>
    <div class="form-group col-md-6">
      <label for="Cardnumber">Card Number</label>
      <input type="Number" class="form-control" id="Cardnumber" 
             onChange={(e)=>{
             setcardNUmber(e.target.value);
          }}
      />
    </div>
  </div>
  <div class="form-group">
    <label for="Expdate">Expiry Date</label>
    <input type="Number" class="form-control" id="Expdate" 
           onChange={(e) =>{
           setexpiryDate(e.target.value);
        }}
    />
  </div>
  <div class="form-group">
    <label for="Ccv">CCV</label>
    <input type="Number" class="form-control" id="Ccv"
           onChange={(e) =>{
           setccvNumber(e.target.value);
    }} />
  </div>
 
  <button type="pay" class="btn">Pay</button>
</form>
</div>
</div>
    )
}


