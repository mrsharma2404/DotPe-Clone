import React, { useState,useEffect } from "react"
import MaterialTable from "material-table"
import { makeStyles } from "@material-ui/core/styles";
import { getData,postDataImage,postData, ServerURL } from "../../fetchnodedata";
import {Button, Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography, Slide ,Box } from '@material-ui/core';
import {Grid, TextField, FormControl, Select, InputLabel, Avatar, MenuItem, Snackbar, Collapse, Table, Paper, Switch } from '@material-ui/core'
import {PhotoCamera} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const useStyles = makeStyles((theme) => ({
    root0: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20, padding: 10,},
    subdiv: {  width: 800,  background: "#ffeaa7",  padding: 10,},
    root1:{ display:'flex', justifyContent:'center', marginTop:20,padding:10 },
    subdiv2:{ width:500,},
    root2: {'& > *': {  margin: theme.spacing(1),},},
    input: {  display: 'none'},
    formControl: {  minWidth: 242,},
    
    large: {  width: theme.spacing(7),  height: theme.spacing(7),},
    formControlselect: {  minWidth: 240,},
}))
const useRowStyles = makeStyles({
    root: {   '& > *': {     borderBottom: 'unset',   }, },
  });

export default  function CurrentOrder(props) {
    const classes = useStyles();
    const [orderList,setOrderList]=useState([]);
    var Restaurant = props.restaurant //this is our data from login page

    const fetchorder=async()=>{
        var body ={restaurantid:Restaurant.restaurant_id}

        var result = await postData("orders/orderlistrest", body);
        //console.log("foodtype",list)
        setOrderList(result);
    }
    useEffect(function(){
        fetchorder();       
       
    },[]);

    const [foodOrderList, setFoodOrderList] = useState([])
    const fetchfoodorders=async(orderid)=>{
    var body = {orderid:orderid}
    var res = await postData("orders/foodOrderlist", body);
    setFoodOrderList(res)

    setOpen(!open)
        
    }

    const [open, setOpen] =useState(false)

    const [state, setState] = React.useState({
      checkedB: true,
    }); //fro switchbutton
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    }; //fro switchbutton

  
   
    return (
       <div className={classes.root0} >
         
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                <TableCell align="left"></TableCell>
                  <TableCell align="left">Order ID</TableCell>
                  <TableCell align="left">Order Time</TableCell>
                  <TableCell align="left">Email ID</TableCell>
                  <TableCell align="left">Mobile No.</TableCell>
                  <TableCell align="left">Food Ready</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.map((items) => (
                  <>
                   <TableRow key={items.orderid}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small"
                            onClick={() =>fetchfoodorders(items.orderid)}>
                          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                   <TableCell align="left" component="th" scope="items">  {items.orderid}</TableCell>
                   <TableCell align="left">{items.ordertime}</TableCell>
                   <TableCell align="left">{items.email}</TableCell>
                   <TableCell align="left">{items.mobile}</TableCell>      
                   <TableCell> <Switch checked={state.checkedB} onChange={handleChange} color="primary" name="checkedB" inputProps={{ 'aria-label': 'primary checkbox' }}/>    </TableCell>              
                 </TableRow>

                 <TableRow >
                                
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 , backgroundColor:'whitesmoke'}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell align="centre">FoodItem ID/Name</TableCell>
                            <TableCell align="centre">Quantity        </TableCell>
                            <TableCell align="centre">Price           </TableCell>
                            <TableCell align="centre">Deliver At      </TableCell>
                            <TableCell align="centre">Food Status      </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {foodOrderList.map((item)=>
                           <TableRow key={item.orderid}>
                           <TableCell align="centre">{item.fooditem}</TableCell>
                           <TableCell align="centre">{item.qtydemand}</TableCell>
                           <TableCell align="centre">{item.price}</TableCell>
                           <TableCell align="centre">{item.deliverat}</TableCell>
                           <TableCell> <Switch checked={state.checkedB} onChange={handleChange} color="primary" name={item.orderid} inputProps={{ 'aria-label': 'primary checkbox' }}/>    </TableCell>         
                           </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
                </TableRow>
                   
                      </>
               
                ))}
                
               
           
              </TableBody>

              

            </Table>
        </TableContainer>
    
      </div>
    )
  }