import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Header from "./Header";
import {useHistory} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {postData} from "../../fetchnodedata"

var otpGenerator = require('otp-generator')


const useStyles = makeStyles({
  root: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
},
subdiv:{width: 800,
  padding: 20,
  marginTop: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},
card: {
  border:'1px solid #bdc3c7',
},
cardactionarea: {
  borderBottom: '1px solid #bdc3c7',
  borderTop: '2px solid #bdc3c7'
},
cardmedia: {
  borderBottom: '1px solid #bdc3c7'
},
});
function Page1(props) {
  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];
  var history=useHistory()

  if(user==undefined)
  {
    var user = [] 
  }
//---------------main function

  const handleHomeDelivery=()=>{
    if(user.address_status!='true')
      {
        setOpen(true)
      }
    else
      {
        history.push({'pathname':'/page2' , data:'home delivery'})
      }
  }

  const handleTakeAway=()=>{
    history.push({'pathname':'/page2', data:'takeaway'})
  }

  const handleDineIn=()=>{
    history.push({'pathname':'/page2', data:'dinein'})

  }


  //-------for form in drawer

  const [address1, setAddress1]= useState("")
  const [address2, setAddress2]= useState("")
  const [landmark, setLandmark]= useState("")
  const [zipcode, setZipcode]= useState("")
  const [name, setname]= useState("")

  //----------for drawer-----------

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var dispatch = useDispatch(); //for redux
  const submit2=async()=>{
      var body = {address1:address1, address2:address2,  zipcode:zipcode,  landmark:landmark, address_status:'true', mobile:user.mobile, name:name };
      var result = await postData("userdetail/saveaddress" , body)
      alert(result.result)
      if(result.result==true)
      {
        dispatch({type:"ADD_CLIENT" , payload:[user.mobile, body] } )
        alert('okay')
        history.push({'pathname':'/page2' , data:'home delivery'})
      } 
  }

  const showdbox=()=>{
    return(
      <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> Please Enter Details To book Order</DialogTitle>
        <DialogContent>
          <TextField  autoFocus  margin="dense"  id="tempname"  onChange={(event)=>setname(event.target.value)} label="Full Name"   fullWidth/>
          <TextField  autoFocus  margin="dense"  id="address1"  onChange={(event)=>setAddress1(event.target.value)} label="Address "   fullWidth/>
          <TextField  autoFocus  margin="dense"  id="address2"  onChange={(event)=>setAddress2(event.target.value)} label="LandMark"   fullWidth/>
          <TextField  autoFocus  margin="dense"  id="address2"  onChange={(event)=>setLandmark(event.target.value)} label="LandMark"   fullWidth/>
          <TextField  autoFocus  margin="dense"  id="zipcode"   onChange ={(event)=>setZipcode(event.target.value)} label="ZipCode"   fullWidth/>
        </DialogContent>
          <DialogActions>
         
          <Button onClick={()=>submit2()} color="primary">  Submit</Button> 
          
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }

 
 
 
    
 


  
  
  const classes = useStyles();
  return (
    <div>
      <Header history={props.history} />
    
    <div className={classes.root} style={{ marginTop:70}}>
      
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card className={classes.card}>
              <CardActionArea className={classes.cardactionarea}>
                <CardMedia className={classes.cardmedia} style={{height:240}}
                  component="img"
                  alt="Home Delivery"
                  image="/home.png"
                  title="Home Delivery"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Home Delivery
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth onClick={()=>handleHomeDelivery()}>Home Delivery</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className={classes.card}>
              <CardActionArea className={classes.cardactionarea}>
                <CardMedia className={classes.cardmedia} style={{height:240}}
                  component="img"
                  alt="Take Away"
                  image="/Takeaway.jpg"
                  title="Take Away"
                  
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Take Away
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                   
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth onClick={()=>handleTakeAway()}>Take Away</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className={classes.card}>
              <CardActionArea className={classes.cardactionarea}>
                <CardMedia className={classes.cardmedia} style={{height:240}}
                  component="img"
                  alt=" Dine In "
                  image="/dining.png"
                  title="Take Away"
                  
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Dine In 
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth onClick={()=>handleDineIn()}> Dine In </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
    {showdbox()}
   

    </div>
  );
}

export default Page1;
