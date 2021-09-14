import React, { useState,useEffect } from 'react';
import { getData,postDataImage,postData, ServerURL } from "../../fetchnodedata";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Typography,Button} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Grid, TextField, FormControl, Select, InputLabel, Avatar, MenuItem, Snackbar, Switch } from '@material-ui/core'
import { useHistory } from "react-router-dom";
import SearchBar from "material-ui-search-bar";


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root0: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20, padding: 10, width:'96%', marginLeft:'2%'},
  subdiv: {    background: "#ffeaa7",  padding: 1,},
  root1:{ display:'flex', justifyContent:'center', marginTop:20,padding:1 },
  subdiv2:{ width:500,},
  root2: {'& > *': {  margin: theme.spacing(1),},},
  input: {  display: 'none'},
  formControl: {  minWidth: 242,},
  
  large: {  width: theme.spacing(7),  height: theme.spacing(7),},
  formControlselect: {  minWidth: 240,},
  root00: {  justifyContent: "center", alignItems: "center", marginLeft:-15 , marginTop: 2, width:'110%'},
  grow:{  flexGrow:1,  },
  sectionDesktop: {  display: 'none',  [theme.breakpoints.up('md')]: {    display: 'flex',  },},
  sectionMobile: {  display: 'flex',  [theme.breakpoints.up('md')]: {    display: 'none',  },},
}))

//no use of this

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [foodOrderList, setFoodOrderList] = useState([])

  const handleopne=async(orderid)=>{
   // const fetchfoodorders=async(orderid)=>{
    var body = {orderid:orderid}
    var res = await postData("orders/foodOrderlist", body);
    setFoodOrderList(res)
    setOpen(!open)    
  }
  //----------for switch button----
  const [state, setState] = React.useState({
    checkedB: false,
    checkedA: false,
  }); //fro switchbutton

  const [foodstatus, setfoodstatus] =useState('pending')
  const handleChange = async(event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //alert(event.target.id)
    //alert(state.checkedB)
    var body = {status:state.checkedB, orderid:event.target.id}
    var res = await postData("orders/updatefoodstatus", body);
  }; //fro switchbutton

  var date = new Date();
  var cd = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  return (
    <React.Fragment>
      
      {row.orderdate == cd ? <></>:<>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => handleopne(row.orderid)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.orderid}</TableCell>
        <TableCell align="centre">{row.ordertime}</TableCell>
        <TableCell align="centre">{row.orderdate}</TableCell>
        <TableCell align="centre">{row.totalamount}</TableCell>
        <TableCell align="centre">{row.ordertype}</TableCell>
        <TableCell align="centre">{row.deliverystatus}</TableCell>
       
      </TableRow>
      </>}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#CAF5E0', borderRadius:4 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Detail ({row.orderid})
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                mobile: {row.mobile} , SecretKey: {row.secretkey}
              </Typography>
              <Typography variant="h7" gutterBottom component="div" style={{width:150}}>
                { row.ordertype=='Home Delivery' ? <> Delivery Address: {row.address}  </>:<></>}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >FoodItem ID/Name  </TableCell>
                    <TableCell >Quantity           </TableCell>
                    <TableCell >Price             </TableCell>
                    <TableCell >   </TableCell>
                    <TableCell >     </TableCell>
                    <TableCell >    </TableCell>
                    <TableCell >       </TableCell>
                    <TableCell >       </TableCell>
                    <TableCell >       </TableCell>
                    <TableCell >       </TableCell>
                    <TableCell >       </TableCell>
                    <TableCell >       </TableCell>
                  </TableRow>
                </TableHead>
                {/**/}
                <TableBody>
                  {foodOrderList.map((historyRow) => (
                    <TableRow key={historyRow.fooditem_id}>
                      <TableCell component="th" scope="row">
                        {historyRow.fooditem_id}/ { historyRow.fooditem}
                      </TableCell>
                      <TableCell>{historyRow.qtydemand}</TableCell>
                      <TableCell >{historyRow.price}</TableCell>
                     
                     
                        
                    </TableRow>
                  ))}
                
                </TableBody>
                
              </Table>
              <Typography style={{hieght:40}} variant="h6" gutterBottom component="div">
               .
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function OlderOrder(props) {
  const classes = useStyles();
  var history = useHistory();                                                 

  //-------------our data ---------------

  const [orderList,setOrderList]=useState([]);
  var restaurantid = history.location.state.data.restaurant_id //this is our data from login page
  //console.log(' row history 11111111111'+  history.location.state.data.restaurant_id )
  
  
  const fetchorder=async()=>{
      var body ={restaurantid:restaurantid}
      var result = await postData("orders/orderlistrest", body);
      //console.log("foodtype",list)
      setOrderList(result);
  }

  useEffect(function(){
      fetchorder();       
       
    },[]);
  
     
  //-------------for serach bar-------------
    //const [rows, setRows] = useState(originalRows);
    const [searched, setSearched] = useState("");
  
    const requestSearch = (searchedVal) => {
      if(searchedVal!='')
      {
        const filteredRows = orderList.filter((row) => {
          return row.orderid.toString().includes(searchedVal.toString()) 
                    //row.deliverystatus.toLowerCase().includes(searchedVal.toLowerCase()) 
        });
        setOrderList(filteredRows);
      }
      else
      {
        fetchorder();  
      }
     
      
  };
  const cancelSearch = () => {
    setSearched("");
    fetchorder();    
    //setOrderList(orderList);
    requestSearch(searched);
  };

  return (
    <div className={classes.grow}>
    <div className={classes.sectionMobile} >
    <div className={classes.root00} >
    <TableContainer component={Paper} style={{width:'100%'}}>
      
    <Grid container spacing={1}>
    <Grid items xs={12} sm={6}>
    <SearchBar style={{width:200, marginLeft:'40%'}}    value={searched} onChange={(searchVal) => requestSearch(searchVal)}  
                onCancelSearch={() => cancelSearch()}  />
    </Grid>
    <Grid items xs={12} sm={6}>
    <Typography variant="h6" gutterBottom component="div" style={{marginLeft:30}}>     Today's Order</Typography>
    </Grid>
    </Grid>
      <Table aria-label="collapsible table" style={{width:'100%'}}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="centre">Order ID</TableCell>
            <TableCell align="centre">Order Date</TableCell>
            <TableCell align="centre">Order Time</TableCell>
            <TableCell align="centre">Total Amount</TableCell>
            <TableCell align="centre">Order Type</TableCell>
            <TableCell align="centre">Order Status </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    <div className={classes.sectionDesktop} >
    <div className={classes.root0} >
    <TableContainer component={Paper} >
    <SearchBar style={{width:200, marginLeft:'40%'}}    value={searched} onChange={(searchVal) => requestSearch(searchVal)}  
    onCancelSearch={() => cancelSearch()}
    />
    <Typography variant="h6" gutterBottom component="div" style={{marginLeft:30}}>
               Today's Order
          </Typography>
      <Table aria-label="collapsible table"  >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="centre">Order ID</TableCell>
            <TableCell align="centre">Order Date</TableCell>
            <TableCell align="centre">Order Time</TableCell>
            <TableCell align="centre">Total Amount</TableCell>
            <TableCell align="centre">Order Type</TableCell>
            <TableCell align="centre">Order Status </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </div>
  );
}
