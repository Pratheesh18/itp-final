import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {container, row, ListGroup} from 'react-bootstrap';
import { Button,Modal,Form, InputGroup, FormControl } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AllPayment(){
    const[Values, setValues] = useState([]);
   
    const[NameOnCard, setnameonCard] = useState("");
    const[CardNumber, setcardNumber] = useState("");
    const[ExpiryDate, setexpiryDate] = useState("");
    const[CcvNumber, setccvNumber] = useState("");


    const [payments, setPayments] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [search, setSearch] = useState("");

    useEffect(()=>{
      function getPayments(){
          axios.get("http://localhost:5000/payment/",).then((res)=>{
              setPayments(res.data);
          }).catch((err)=>{
              alert(err.message)
          })
      }
      getPayments();
    },[])
    
    const deletepayment = (id) =>{
        axios.delete(`http://localhost:5000/payment/delete/${id}`);
        alert("Details deleted.");
    }


    const UpdatePaymentDeatails = (val) =>{
        console.log('test====',val)
         setValues(val);
        
        handleShow()
    }
    
    const createPDF = (_id, NameOnCard, CardNumber,ExpiryDate, CcvNumber)=>{
        console.log(_id);
        console.log(NameOnCard);
        console.log(CardNumber);
        console.log(ExpiryDate);
        console.log(CcvNumber);
        

        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = `Peace Of Mind      ID- ${_id}`;
        const paymentName = `Payee Name: ${NameOnCard}`;
        const cardNumber = `Card Number:${CardNumber}`;
        const expDate = `Expiry Date :${ExpiryDate}`;
        const ccvNumber = `CCV Number: ${CcvNumber}`;
        const image1 = "https://res.cloudinary.com/dbw0cho6v/image/upload/v1633115457/Siyatha/depositphotos_403895126-stock-illustration-isometric-online-payments-online-payment_lvsqn9.jpg"
        const image2 = "https://res.cloudinary.com/dbw0cho6v/image/upload/v1633115435/Siyatha/GettyImages-1154092756-e31f198466e443018b44a088ead1250b_yfga2y.jpg"
        const left = 20;
        const top = 8;
        const imgWidth = 150;
        const imgHeight = 100;
        const lefts = 450;
        const tops = 300;
        const imgWidths = 350;
        const imgHeights = 250;
        doc.setFontSize(20);
        doc.text(200,40 ,title);
        doc.text(60,200, paymentName );
        doc.text(60,250, expDate);
        doc.text(60, 300, cardNumber);
        doc.text(60, 350, ccvNumber);
        doc.addImage(image1, 'PNG', left, top ,imgWidth, imgHeight);
        doc.addImage(image2, 'PNG' , lefts, tops, imgWidths, imgHeights);
        
        
        doc.save(`${NameOnCard}'s Payment.pdf`);
     
    }

    function sendData(e) {
       
        e.preventDefault();
       

        var nameoncard=null;
        var cardnumber=null;
        var expirydate=null;
        var ccvnumber=null;
        



        if (NameOnCard===""){
            console.log('test null cond')
           // setName(Values.name)
            nameoncard=Values.NameOnCard;
        }else{
            //setName(name)
            nameoncard=NameOnCard
            console.log('test not null cond')

        }
        if (CardNumber===""){
            //setAddress(Values.address)
            cardnumber=Values.CardNumber;
        }else{
            //setAddress(address)
            cardnumber=CardNumber
        }
        if (ExpiryDate===""){
            //setCity(Values.city)
            expirydate=Values.ExpiryDate

        }else{
           // setCity(city)
           expirydate=ExpiryDate
        }
        if (CcvNumber===""){
           // setCode(Values.postalcode)
            ccvnumber=Values.CcvNumber
        }else{
            //setCode(postalcode)
            ccvnumber=CcvNumber
        }
       
        const updatePayment={
            id:Values._id,
            name:nameoncard,
            CardNumber:cardnumber,
            ExpiryDate:expirydate,
            CcvNumber:ccvnumber
        }

        console.log('form submit payload =====',updatePayment)


        axios.put(`http://localhost:5000/payment/update/${updatePayment.id}`, updatePayment).then(()=>{
            alert("Payment Details Updated");
            handleClose();
            window.location = `/allpayment`;
            
        }).catch((err)=>{
            console.log(err);
            alert(err);
        })
    }

    
     

    return(
        <div>
            <h1>All Payments</h1>

            <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default" onChange={(e) =>{
          setSearch(e.target.value);
      }}
    />
  </InputGroup>

  {payments.filter(Payment =>{
      if(search === ""){
          return Payment
      }
      else if(Payment.NameOnCard.toLowerCase().includes(search.toLowerCase())){
          return Payment
      }
  })
            
    .map((val,key)=>{
            return(
             <div key={key} className="payments">
                 <container length="100px">
                      <row>    
                 <ListGroup>
                 <ListGroup.Item>{val._id}</ListGroup.Item>
                 <ListGroup.Item>{val.NameOnCard}</ListGroup.Item>
                 <ListGroup.Item>{val.CardNumber}</ListGroup.Item>
                 <ListGroup.Item>{val.ExpiryDate}</ListGroup.Item>
                 <ListGroup.Item>{val.CcvNumber}</ListGroup.Item>
                 
                 
                 
                 <Button variant="primary" onClick={()=> UpdatePaymentDeatails(val)} className="uppay">
      Update
      </Button>
                 
                 <Button className="delpay" onClick={()=> deletepayment(val._id)}> Delete</Button>
                 <Button className="generatePdF" onClick={()=> createPDF(val._id, val.NameOnCard, val.ExpiryDate, val.Ccv)}>Generate report</Button>
                 </ListGroup>
                
                 </row>

                 <Modal show={show} onHide={handleClose} className="getfunc">
                    <Modal.Header closeButton>
                    <Modal.Title>Update Details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                    <Form onSubmit={sendData}>
         

         <Form.Group controlId="container">
           <Form.Label for="NameOnCard">Name On Card</Form.Label>
           <Form.Control type="text" 
           defaultValue={Values.NameOnCard}
           onChange={(e)=>{
            setnameonCard(e.target.value);
          }} required/>
         </Form.Group>

         <Form.Group controlId="container">
            <Form.Label for="CardNumber">Card Number</Form.Label>
               <Form.Control type="text" 
                    defaultValue={Values.CardNumber} 
                     onChange={(e)=>{
                    setcardNumber(e.target.value);
      }} required/>
    </Form.Group>

    <Form.Group controlId="container">
    <Form.Label for="ExpiryDate">Expiry Date</Form.Label>
    <Form.Control type="text"  
    defaultValue={Values.ExpiryDate}
    onChange={(e)=>{
        setexpiryDate(e.target.value);
      }} required/>
    </Form.Group>

    <Form.Group controlId="container">
    <Form.Label for="Ccv">Ccv Number</Form.Label>
    <Form.Control type="text" 
    defaultValue={Values.CcvNumber}
    onChange={(e)=>{
        setccvNumber(e.target.value);
      }} required/>
    </Form.Group>

 
         
         <Button  className="finalpay" type="submit"> Edit details</Button>
         </Form>

                    </Modal.Body>
        
                </Modal>
                 <br />
                 </container>
            </div>
            );
        })}
        </div>
    );
}

