import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Foodtype1 from './food';
import AllfoodType from './allfood';
import Foodtype2 from './food1';
import AllfoodItem from './allfooditem';
import CurrentOrder3 from './CurrentOrder';
import OlderOrder from './OlderOrder';
import HomeRes from './HomeRes';
//import { Component } from 'react';
//import Addnewres from './AddNewRestorent';
//import Allrestaurant from './AllRestaurant';

export default function ListItems(props)
{
  const handleClick=(component)=>{
    props.setDashBoardView(component)
  }


const mainListItems = ()=>{

return(
  <div>
    <ListItem button onClick={()=>handleClick(<HomeRes   restaurant={props.restaurant}/> )}> 
      <ListItemIcon>
      <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Foodtype1   restaurant={props.restaurant}/> )}  >
      <ListItemIcon>
      <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Add Food Type"  />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<AllfoodType  restaurant={props.restaurant}/> )}>
      <ListItemIcon>
      <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List of Food Type" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Foodtype2 restaurant={props.restaurant}/> )}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText  primary="Add FoodItems"  />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<AllfoodItem  restaurant={props.restaurant}/> )}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText  primary="List of Food Item"  />
    </ListItem>
    
  </div>
);
}

const secondaryListItems = ()=>{
  return(
  <div>
    <ListSubheader inset> </ListSubheader>
    <ListItem button onClick={()=>handleClick(<CurrentOrder3  restaurant={props.restaurant}/> )}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Current Order "   />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<OlderOrder  restaurant={props.restaurant}/>)} >
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText  primary="Older Order"  
       />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
       
      </ListItemIcon>
      <ListItemText primary="" //onClick={()=>handleClick(<CurrentOrder2  restaurant={props.restaurant}/> )} 
      />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
     
      </ListItemIcon>
      <ListItemText primary=" "//onClick={()=>handleClick(<CurrentOrder3  restaurant={props.restaurant}/> )} 
      />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      
      </ListItemIcon>
      <ListItemText primary=" " //onClick={()=>handleClick(<CurrentOrder3  restaurant={props.restaurant}/> )} 
      />
    </ListItem>
  </div>
);}

return(
  <div>
    {mainListItems()}
    {secondaryListItems()}
  </div>
)
  }