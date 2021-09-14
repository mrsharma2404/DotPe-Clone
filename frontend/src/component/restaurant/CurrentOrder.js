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
  root0: { display: "flex",  marginTop: -20, marginLeft: -30, marginRight: -30,  paddingLeft: 1,  },
  root00: { display: "flex",   marginLeft: 20, marginRight: 5,  paddingLeft: 1,  },
  subdiv: {    background: "#ffeaa7",  paddingLeft: 1, paddingRight: 1,},
  root1:{ display:'flex', justifyContent:'center', marginTop:2,   paddingLeft: 1, paddingRight: 1, },
  subdiv2:{},
  root2: {'& > *': {  margin: theme.spacing(0),},},
  input: {  display: 'none'},
  formControl: {  minWidth: 242,},
  
  large: {  width: theme.spacing(0),  height: theme.spacing(0),},
  formControlselect: {  minWidth: 240,},
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
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
    checkedF: false,
  }); //fro switchbutton

  const [foodstatus, setfoodstatus] =useState('pending')
  const handleChange0 = async(event) => {
   
    setState({ ...state, [event.target.name]: event.target.checked });
    var body = {status:'Order Declined', orderid:event.target.id}
    var res = await postData("orders/updatefoodstatus", body);
  }; //fro switchbutton
  const handleChange1 = async(event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    var body = {status:'Order Accepted', orderid:event.target.id}
    var res = await postData("orders/updatefoodstatus", body);
  }; //fro switchbutton
  const handleChange2 = async(event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    var body = {status:'Food is Preparing', orderid:event.target.id}
    var res = await postData("orders/updatefoodstatus", body);
  }; //fro switchbutton
  const handleChange3 = async(event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    var body = {status:'Food is Ready', orderid:event.target.id}
    var res = await postData("orders/updatefoodstatus", body);
  }; //fro switchbutton
  const handleChange4 = async(event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    var body = {status:'Food is Taken', orderid:event.target.id}
    var res = await postData("orders/updatefoodstatus", body);
  }; //fro switchbutton
  const handleChange5 = async(event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    var body = {status:'Order Delivered', orderid:event.target.id}
    var res = await postData("orders/updatefoodstatus", body);
  }; //fro switchbutton
 

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
        <TableCell component="th" scope="row">{row.orderid}</TableCell>
        <TableCell align="centre">{row.ordertime}</TableCell>
        <TableCell align="centre">{row.totalamount}</TableCell>
        <TableCell align="centre">{row.ordertype}</TableCell>

        {/** checked ABCDEF are in order respectively Order Declined 	Order Accepted 	Food is Preparing 	Food is Ready 	Food is Taken 	Delivered */}
        
        {row.deliverystatus == 'Order Declined'? <> {state.checkedA = true } </> :<> </>
        }
        {row.deliverystatus == 'Order Accepted'? <> {state.checkedB = true } </> :<> </>
        }
        {row.deliverystatus == 'Food is Preparing'? <> {state.checkedC = true } </> :<> </>
        }
        {row.deliverystatus == 'Food is Ready'? <> {state.checkedD = true } </> :<> </>
        }
        {row.deliverystatus == 'Food is Taken'? <> {state.checkedE = true } </> :<> </>
        }
        {row.deliverystatus == 'Order Delivered'? <> {state.checkedF = true } </> :<> </>
        }


        {state.checkedE == false ? <> 
        {state.checkedB == false ?  <> 
        {state.checkedF == false ?  
        <TableCell> <Switch checked={state.checkedA} onChange={handleChange0} 
                      size='small' color="secondary" disabled={state.checkedA} name="checkedA" id={row.orderid} inputProps={{ 'aria-label': 'primary checkbox' }}/>   
         </TableCell>  : <TableCell align="centre" >.</TableCell> }
         </>:<TableCell align="centre" >.</TableCell> } 
         </>:<TableCell align="centre" >.</TableCell> }

        {state.checkedA == false? <> 
        {state.checkedE == false ? <> 
        {state.checkedF == false ?  
         <TableCell> <Switch checked={state.checkedB} onChange={handleChange1}  
                      size='small' color="primary"  disabled={state.checkedB} name="checkedB" id={row.orderid} inputProps={{ 'aria-label': 'primary checkbox' }}/>   
         </TableCell> : <TableCell align="centre" >.</TableCell> }
          </>:<TableCell align="centre" >.</TableCell> } 
          </>:<TableCell align="centre" >.</TableCell> }
        
        {state.checkedA == false? <> 
        {state.checkedE == false ? <> 
        {state.checkedF == false ?  
         <TableCell> <Switch checked={state.checkedC} onChange={handleChange2} 
                      size='small' color="primary" disabled={state.checkedC} name="checkedC" 
                      id={row.orderid} inputProps={{ 'aria-label': 'primary checkbox' }}/>   
         </TableCell>  : <TableCell align="centre" >.</TableCell>}
         </>:<TableCell align="centre" >.</TableCell> } 
         </>:<TableCell align="centre" >.</TableCell> }

        
        {state.checkedA == false? <> 
        {state.checkedE == false ? <> 
        {state.checkedF == false ?  
         <TableCell> <Switch checked={state.checkedD} onChange={handleChange3}  
                      size='small' color="primary" disabled={state.checkedD} name="checkedD"
                       id={row.orderid} inputProps={{ 'aria-label': 'primary checkbox' }}/>   
         </TableCell>  : <TableCell align="centre" >.</TableCell>}
         </>:<TableCell align="centre" >.</TableCell> }
         </>:<TableCell align="centre" >.</TableCell> }

         {state.checkedA == false? <> 
         {state.checkedF == false ?  
         <TableCell> <Switch checked={state.checkedE} onChange={handleChange4} 
                      size='small' color="primary" disabled={state.checkedE} name="checkedE" id={row.orderid} inputProps={{ 'aria-label': 'primary checkbox' }}/>   
         </TableCell>  : <TableCell align="centre" >.</TableCell>}
         </>:<TableCell align="centre" >.</TableCell> }
         
        {row.ordertype == 'Home Delivery'? <> 
        {state.checkedA == false ?   
         <TableCell> <Switch checked={state.checkedF} onChange={handleChange5} 
                      size='small' color="primary"  disabled={state.checkedF} name="checkedF" id={row.orderid} inputProps={{ 'aria-label': 'primary checkbox' }}/>   
         </TableCell>  :<TableCell align="centre" >.</TableCell>}
         </>:<TableCell align="centre" >.</TableCell> }
            
      </TableRow>
      </>: <> </> }
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


export default function CurrentOrder3(props) {
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
    <div className={classes.root0} >
    <TableContainer component={Paper} style={{ width:'100%', height:570}}>
    <SearchBar style={{width:200, marginLeft:'40%'}}    value={searched} onChange={(searchVal) => requestSearch(searchVal)}  
    onCancelSearch={() => cancelSearch()}
    />
    <Typography variant="h6" gutterBottom component="div" style={{marginLeft:30}}>
               Today's Order
          </Typography>
      <Table stickyHeader  aria-label="collapsible table" >
        <TableHead >
          <TableRow>
            <TableCell />
            <TableCell align="centre">Order ID</TableCell>
            <TableCell align="centre">Order Time</TableCell>
            <TableCell align="centre">Total Amount</TableCell>
            <TableCell align="centre">Order Type</TableCell>
            <TableCell align="centre">Order Declined </TableCell>
            <TableCell align="centre">Order Accepted </TableCell>
            <TableCell align="centre">Food is Preparing </TableCell>
            <TableCell align="centre">Food is Ready </TableCell>
            <TableCell align="centre">Food is Taken </TableCell>
            <TableCell align="centre">Delivered </TableCell>
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
    <div className={classes.root00} >
    <TableContainer component={Paper} style={{height:565}}>
    <SearchBar style={{width:200, marginLeft:'40%'}}    value={searched} onChange={(searchVal) => requestSearch(searchVal)}  
    onCancelSearch={() => cancelSearch()}
    />
    <Typography variant="h6" gutterBottom component="div" style={{marginLeft:30}}>
               Today's Order
          </Typography>
      <Table stickyHeader  aria-label="collapsible table"  style={{height:500}}>
        <TableHead >
          <TableRow>
            <TableCell />
            <TableCell align="centre">Order ID</TableCell>
            <TableCell align="centre">Order Time</TableCell>
            <TableCell align="centre">Total Amount</TableCell>
            <TableCell align="centre">Order Type</TableCell>
            <TableCell align="centre">Order Declined </TableCell>
            <TableCell align="centre">Order Accepted </TableCell>
            <TableCell align="centre">Food is Preparing </TableCell>
            <TableCell align="centre">Food is Ready </TableCell>
            <TableCell align="centre">Food is Taken </TableCell>
            <TableCell align="centre">Delivered </TableCell>
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
