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
import {Typography, Button} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useDispatch, useSelector } from "react-redux";
import Header from './Header';
import SearchBar from "material-ui-search-bar";
import '../../style1.css';
import { useMediaQuery } from 'react-responsive'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root0: { justifyContent: "center", alignItems: "center", marginTop: 2, width:'100%'},
  subdiv: {  width: 800,  background: "#ffeaa7",  padding: 10,},
  root1:{ display:'flex', justifyContent:'center', marginTop:20,padding:10 },
  subdiv2:{ width:500,},
  root2: {'& > *': {  margin: theme.spacing(1),},},
  input: {  display: 'none'},
  formControl: {  minWidth: 242,},
  
  large: {  width: theme.spacing(7),  height: theme.spacing(7),},
  formControlselect: {  minWidth: 240,},
  //----for responsive
  root00: {  justifyContent: "center", alignItems: "center", marginTop: 20, marginLeft:'20%',  width:'60%'},
  grow:{  flexGrow:1,  },
  sectionDesktop: {  display: 'none',  [theme.breakpoints.up('md')]: {    display: 'flex',  },},
  sectionMobile: {  display: 'flex',  [theme.breakpoints.up('md')]: {    display: 'none',  },},
}))


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
  var date = new Date();
  var cd = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

  

  return (
    <React.Fragment>
      {row.orderdate == cd ? <>
      
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => handleopne(row.orderid)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
          <TableCell component="th" scope="row" >{row.orderid}</TableCell>
          <TableCell align="centre"><div style={{width:36, overflow:'hidden'}}> {row.ordertime}</div></TableCell>
          <TableCell align="centre">{row.totalamount}</TableCell>
          <TableCell align="centre">{row.deliverystatus}</TableCell>
      </TableRow>
      </>:<> </>}
    
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#FEF3BD', width:850 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Detail ({row.ordertype}) (secretkey: {row.secretkey})
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >FoodItem Name  </TableCell>
                    <TableCell >Quantity           </TableCell>
                    <TableCell >Price             </TableCell>
                  </TableRow>
                </TableHead>
                {/**/}
                <TableBody>
                  {foodOrderList.map((historyRow) => (
                    <TableRow key={historyRow.fooditem_id}>
                      <TableCell component="th" scope="row">
                        { historyRow.fooditem}
                      </TableCell>
                      <TableCell>{historyRow.qtydemand}</TableCell>
                      <TableCell >{historyRow.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}








export default function ViewOrder(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  const classes = useStyles();
  var client = useSelector((state) => state.client);
  var user = Object.values(client)[0];
  var res = useSelector((state) => state.res);
  var resInfo = Object.values(res)[0];
  if(user==undefined)
  {
    var user = [] 
  }
  //alert(user)
  //alert(user.mobile)
  //-------------our data ---------------

  const [orderList,setOrderList]=useState([]);
  //var Restaurant = props.restaurant //this is our data from login page
  const fetchorder=async()=>{
      var body = {mobile:user.mobile,  restaurantid:resInfo.restaurant_id}
      var result = await postData("orders/fetchorderuser", body);
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
  
  const viewolderorder=()=>{
    props.history.push({'pathname':'/orders2'})
  }
 

  return (
    <>
    <div  style={{marginBottom:120}}>
    <Header history={props.history} />
    </div>
    
    <div className={classes.grow}>
    <div className={classes.sectionMobile} >
    <div  className={classes.root0}  >
    <TableContainer component={Paper}>
    <SearchBar style={{width:200, marginLeft:'40%'}}    value={searched} onChange={(searchVal) => requestSearch(searchVal)}  
    onCancelSearch={() => cancelSearch()}
    />
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="centre">Order ID</TableCell>
            <TableCell align="centre">Order<br/>Time</TableCell>
            <TableCell align="centre">Total Amount</TableCell>
            <TableCell align="centre">Food Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button style={{margin:50}} variant='outlined' color='primary' onClick={(event)=>viewolderorder(event)} >View Older Order</Button>
  
    </div>
    </div>

    <div className={classes.sectionDesktop}>
    <div  className={classes.root00}  >
    <TableContainer component={Paper}>
    <SearchBar style={{width:200, marginLeft:'40%'}}    value={searched} onChange={(searchVal) => requestSearch(searchVal)}  
    onCancelSearch={() => cancelSearch()}
    />
    <Typography variant="h6" gutterBottom component="div" style={{marginLeft:30}}>
               Today's Order
          </Typography>
         
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="centre">Order ID</TableCell>
            <TableCell align="centre">Order Time</TableCell>
            <TableCell align="centre">Total Amount</TableCell>
            <TableCell align="centre">Food Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button style={{margin:50}} variant='outlined' color='primary' onClick={(event)=>viewolderorder(event)} >View Older Order</Button>
    </div>
    
    
    </div>
    </div>
    </>
  );
}








