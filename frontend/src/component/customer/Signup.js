import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import {postData} from "../../fetchnodedata"
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  grow: {flexGrow: 1},
  root: {width: "100%", maxWidth: "36ch", backgroundColor: theme.palette.background.paper,},
  inline: {  display: "inline",},
  sectionDesktop: {  display: "none",  [theme.breakpoints.up("sm")]: {    display: "flex",  },},
  sectionMobile: {  display: "flex",  [theme.breakpoints.up("sm")]: {    display: "none",  },},
  root: {  "& > *": {    margin: theme.spacing(1),    width: "25ch",  },},
  margin: {  margin: theme.spacing(1),},
}));

export default function Signup(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showCPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowCPassword = () => {
    setValues({ ...values, showCPassword: !values.showCPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //data from signin page
  var mobile = props.history.location.state.mobileno;
  var otp1 = props.history.location.state.otp1;

  useEffect(function(){
    saveotp()
    
    },[])

  //for data save 
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")

  const[otp5, setOtp5] = useState(" ")
  const[chkotp, setchkotp] = useState("")

  const saveotp=()=>{
   
   
    alert(otp1)
    setOtp5(otp1)
   
  }

  const handleSubmit = async () => {
    if (values.password == values.confirmPassword && otp5 == chkotp) {
      var body = {
        mobile: mobile,
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: values.password,
        address_status: "false",
      };
      var result = await postData("userdetail/newuser", body);
      alert(result.result);
    } else {
      alert("Confirm Password not Matched...");
    }
  };
  
  return (
    <div>
      <Header />

      <div>
        <container style={{border:"0.5px solid #dfe6e9", borderRadius: 50, display:"flex", marginTop: 30, 
                  marginLeft: 90,  marginRight: 90,  alignItems: "center",  flexDirection: "column",}}>

          <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:10, width: "100%",}} >
            <Grid container spacing={1}>

              <Grid item xs="12" sm={6}>
                <div style={{ marginTop: 1, marginLeft: 10, paddingLeft: 40 }}>
                  <img src="bg.jpg" width="450" height="450" />
                </div>
              </Grid>

              <Grid item xs="12" sm={6}>
                <div>
                  <h2>Sign up</h2>
                  <p>Please enter your details. </p>
                  <Grid item xs={12} style={{ padding: 10 }}>
                    <TextField id="outlined-basic" fullWidth label="Your First Name" variant="outlined"
                    onChange={(event)=>setFirstname(event.target.value)}/>
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <TextField id="outlined-basic" fullWidth label="Your Last Name" variant="outlined"
                    onChange={(event)=>setLastname(event.target.value) } />
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <TextField id="outlined-basic" fullWidth label="Enter Your Email id" variant="outlined" 
                    onChange={(event)=>setEmail(event.target.value)} />
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">  Password </InputLabel>

                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}  fullWidth={true}  labelWidth={70}                    
                        onChange={handleChange("password")}
                        endAdornment={ <InputAdornment position="end">                        
                                        <IconButton aria-label="toggle password visibility"  edge="end"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}   
                                        >
                                        {values.showPassword ? (<Visibility/>) : (<VisibilityOff/>)}
                                        </IconButton>
                                        </InputAdornment>
                                      }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-confirmPassword"> Confirm Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-confirmPassword"
                        type={values.showCPassword ? "text" : "password"}
                        value={values.confirmPassword} fullWidth={true}  labelWidth={70}
                        onChange={handleChange("confirmPassword")}
                        endAdornment={ <InputAdornment position="end">                         
                                        <IconButton aria-label="toggle password visibility" edge="end"                              
                                          onClick={handleClickShowCPassword}
                                          onMouseDown={handleMouseDownPassword}                              
                                        >
                                        {values.showCPassword ? ( <Visibility />) : (  <VisibilityOff />)}
                                        </IconButton>
                                       </InputAdornment>
                                      }           
                      />
                    </FormControl>
                  </Grid>

                  <Grid style={{border:"0.5px solid #dfe6e9", borderRadius:30, padding:10, display:'flex', flexDirection:'row', fontSize:16}}>                   
                    <div>
                    <FormControlLabel control={<Checkbox name="checkedC" />} />
                      Enable order updates and important information on <WhatsAppIcon style={{color:'#009432'}} /> Whatsapp 
                    </div>
                  </Grid>

                  <Grid item xs={12} style={{ padding: 10 }}>
                    <h2>Verify</h2>
                    <p> We have sent 6 digit otp on <b>{mobile}</b></p>
                    <TextField id="outlined-basic" label="Enter Your OTP" variant="outlined"
                    onChange={(event)=>setchkotp(event.target.value)} fullWidth/>
                  </Grid>

                  <div>
                    <Button variant="outlined" color="secondary" style={{marginBottom:50}} 
                    onClick={()=>handleSubmit()} >Submit</Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </container>
      </div>
    </div>
  );
}
