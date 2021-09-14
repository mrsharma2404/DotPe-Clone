import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { propTypes } from 'qrcode.react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    flexDirection:'row',

    textAlign:'centre'
  },
 
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    fontWeight: 800,  fontSize: 14,  width: 25,  height: 25,
  },
}));


export default function QtySpinner(props) {
  const classes = useStyles();

   const [value, setValue] = React.useState(props.value);

   const increament=()=>{
       
       var c = value+1;
       setValue(c);
       props.onChange(c)
       
   }
   const Decreament=()=>{
    if(value!=0){
    var c = value-1;
    setValue(c);
    props.onChange(c)}
    
}


  return (
      <div>
    {value == 0 ? (<div className={classes.root}><Button  style={{height:25,fontSize:10,width:120}} onClick={()=>increament()} variant="outlined" color="primary"> Add to Cart </Button> </div>):(
    <div className={classes.root}>
     <Avatar onClick={()=>Decreament()}  className={classes.purple}>-</Avatar>
      <div style={{fontWeight: 600, fontSize: 16, width: 20, display: "flex", justifyContent: "center", alignItems: "center"}}>{value}</div>
      
      <Avatar onClick={()=>increament()} className={classes.purple}>+</Avatar>
    </div>)
   

      }
      </div>
  );
}
