import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PrintIcon from "@material-ui/icons/Print";
import { getData,ServerURL, postData, postDataAndImage } from "../../fetchnodedata";

import '../../public/Qr.css';
import logo from "../../public/logo.png";
import payment from "../../public/cashfree-payment-options.png";
import restaurant from "../../public/resto.jpg";

import Container from "@material-ui/core/Container";

var QRCode = require('qrcode.react');
const useStyles = makeStyles((theme) => ({

    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      padding: 10,
      flexDirection:'column'
    },
    subdiv: {
      width: 510,
      background: "#ffeaa7",
      padding: 10,
    },
    formControl: {
      minWidth: 350,
    },
    formControlstatecity: {
      minWidth: 500,
    },
  
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    input: {
      display: "none",
    },
  }));


function QrCodeShow(props){
  console.log(props.history.location.state.restaurant)
  const classes = useStyles();
  const [state,setState]=useState(true)
  const [qrLink, setQrLink] = useState(props.history.location.state.data);
  const [restaurant, setRestaurant] = useState(props.history.location.state.restaurant);
  alert(props.history.location.state.restaurant.restaurant_name)
  
   // var qrLink = "http://localhost:5000/DreamArena/9"

 const showQrCode=()=>{
      return(
             <div>
              <QRCode value={qrLink} size={200} />,
              </div>
            );
   }


return(
  <>


     <div className="App">
      <React.Fragment>
        <Container maxWidth="sm">  
          <div className="container">
           <div className="column-1">
            <div className="header">
              <img src={`${ServerURL}/images/${restaurant.logo}`} width="100%" />
            </div>
              <h2>scan here for menu</h2>
              {state?<div>{showQrCode()}</div>:<div></div>}
              <h2>{restaurant.restaurant_name}</h2>
              <h3>{restaurant.mobile}</h3>
              <img src={payment} width="100%" />
           </div>
          </div>
        </Container>
      <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={() => window.print()}  style={{margin:10,width:200}}>Print</Button>
      </React.Fragment>
    </div>
     </>
   );
}

export default QrCodeShow;