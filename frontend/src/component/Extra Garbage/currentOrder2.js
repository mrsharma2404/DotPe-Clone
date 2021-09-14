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


export default  function CurrentOrder2(props) {
  useEffect(function(){
    fetchorder();       
   
  },[]);

  const classes = useStyles();
  
  var Restaurant = 8
  //props.restaurant //this is our data from login page

  const [orderList,setOrderList]=useState([]);

  const fetchorder=async()=>{
      var body ={restaurantid:8}
      var result = await postData("orders/orderlistrest", body);
      setOrderList(result);
  }
    
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  }); //fro switchbutton
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }; //fro switchbutton

  const [foodOrderList, setFoodOrderList] = useState([])

  const [crrorderid, setcrrorderid] = useState()

  const fetchfoodorders=async()=>{
  var body = {orderid:crrorderid}
  var res = await postData("orders/foodOrderlist", body);
  setFoodOrderList(res)
 
  }

    const showfooditems=()=>{
      return foodOrderList.map((item, index) => {    
        return(        
          <div style={{display:'flex',flexDirection:'row'}}>  
          <TableRow key={item.orderid}>
          <TableCell align="centre">{item.fooditem}</TableCell>
          <TableCell align="centre">{item.qtydemand}</TableCell>
          <TableCell align="centre">{item.price}</TableCell>
          <TableCell align="centre">{item.deliverat}</TableCell>
          <TableCell> <Switch checked={state.checkedB} onChange={handleChange} color="primary" name={item.orderid} inputProps={{ 'aria-label': 'primary checkbox' }}/>    </TableCell>         
          </TableRow> 
          </div>        
        )
      })}
  
   
    return (
      <div className={classes.root0} >
         
      <MaterialTable title="One Detail Panel Preview"
        columns={[
          { title: 'Order ID', field: 'orderid' },
          { title: 'Order Time', field: 'ordertime',  },
          {  title: "Email ID", field: "email",},
          {  title: "Mobile No", field: "mobile",},
          {  title: "Order Status", field: "Name",
          render: (rowData) => (
            <div style={{ borderRadius: 10 }}> 
              <Switch checked={state.checkedB} onChange={handleChange} color="primary" name="checkedB" inputProps={{ 'aria-label': 'primary checkbox' }}/>              
            </div>
          ),}
         
        ]}
        data={orderList}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'edit food type',
            //onClick: (event, rowData) => handleDOpen(rowData),
          } 
        ]}
        detailPanel={rowData => {
          setcrrorderid(rowData.orderid)
          //alert(rowData.orderid)
          //
          //fetchfoodorders()
          return (
            <>       
            abcd
           
            {rowData.orderid}
            {crrorderid}
            </>
          )
        }}
      /> 
    
      </div>
    )
  }