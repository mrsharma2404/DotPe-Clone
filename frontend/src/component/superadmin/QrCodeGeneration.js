import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getData,ServerURL, postData, postDataAndImage } from "../../fetchnodedata";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20, padding: 10,},
  subdiv: {  width: 320,  background: "D9E3F0",  padding: 10,},
  formControl: {  minWidth: 300,},
  formControlstatecity: {  minWidth: 300,},
  large: {  width: theme.spacing(7),  height: theme.spacing(7),},
  input: {  display: "none",},
}));

export default function QrCode(props) {
  const classes = useStyles();
  const [qrLink, setQrLink] = useState("");
  const [list, setList] = useState([]);
  const [restaurant, setRestaurant] = useState();

  const fetchRestaurant = async () => {
    var result = await getData("restaurant/listrestaurant");
    setList(result);
  };
 
  const fillRestaurant = () => {
    return list.map((item, index) => {
      return (
        <MenuItem value={item}>{item.restaurant_name}</MenuItem>
      );
    });
  };


  const handleRestaurantChange = async (event) => {
    var item = event.target.value;
    setQrLink(`${ServerURL}/${item.restaurant_name.replace(/\s/g, "")}`);
    //setQrLink(`${ServerURL}/${item.restaurant_name.replace(/\s/g, "")}/${item.restaurant_id}`); //withid
    setRestaurant(item);
  //setQrLink(event.target.value)

  };
  let history = useHistory();
 const showQrCode=()=>{
   history.push({pathname:'/QrCodeShow'},{ data:qrLink , restaurant:restaurant })
 }

  useEffect(function () {
    fetchRestaurant();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl style={{ width:'300'}}
              variant="outlined"
              className={classes.formControlstatecity}
            >
              <InputLabel>Restaurant Id</InputLabel>
              <Select
                //value={age}
                onChange={(event) => handleRestaurantChange(event)}
                label="Restaurant ID"
                width='300'
              >
                {fillRestaurant()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Restaurant Link"
             style={{ width:350}}
              value={qrLink}
              variant="outlined"
              onChange={(event) => setQrLink(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button style={{ width:'300'}} onClick={() =>showQrCode()} variant="contained" >
              Generate QrCode
            </Button>
          </Grid>
        </Grid>
        
        
         </div>
    </div>
  );
}
