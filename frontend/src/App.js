import Foodtype2 from './component/restaurant/food1';
import Addnewres from './component/superadmin/AddNewRestorent'
import Foodtype1 from './component/restaurant/food'
import Allrestaurant from "./component/superadmin/AllRestaurant"
import AllfoodType from './component/restaurant/allfood'; 
import AllfoodItem from './component/restaurant/allfooditem';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { PinDropSharp } from '@material-ui/icons';
import SuperAdminLogin from './component/superadmin/SuperAdminLogin';
import AdminDashBoard from './component/superadmin/AdminDashboard';
import RestaurantLogin from './component/restaurant/restaurantlogin';
import RestaurantDashBoard from './component/restaurant/restaurantdashboard';
import QrCode from './component/superadmin/QrCodeGeneration';
import Home from './component/customer/Home';
import QtySpinner from './component/customer/QtySpinner';
import Signin from './component/customer/SignIn';
import Signup from './component/customer/Signup';
import Showcart from './component/customer/showcart';
import MakePayment from './component/customer/MakePayment';
import OrderSubmitted from './component/customer/OrderSubmitted';
import QrCodeShow from './component/superadmin/QrCodeShow';
import Page1 from './component/customer/SelectOrderType';
import Page2 from './component/customer/SelectpaymentType';
import ViewOrder from './component/customer/ShowOrder';
import CurrentOrder3 from './component/restaurant/CurrentOrder';
import UserProfile from './component/customer/UserProfile';
import SimplePaper from './component/customer/Slider';
import ViewOrder2 from './component/customer/ShowOrder2';
import OlderOrder from './component/restaurant/OlderOrder';
import HomeRes from './component/restaurant/HomeRes';


function App(props) {
  //<div style={{ height:500 }}></div>
  //<Addnewres />
  //<div style={{ height:500 }}></div>
  //<Foodtype1 />
  //<div style={{ height:500 }}></div>
  //<AllfoodType />
  //<div style={{ height:500 }}></div>
  //<Foodtype2 />
  //<div style={{ height:500 }}></div>
  //<AllfoodItem /> 
  
  return (
    <div >
        <Router>

          <Route           
          exact
          strict
           component={Addnewres}
           path="/addnewres"
           history={props.history}
           ></Route>
           <Route           
          exact
          strict
           component={Allrestaurant}
           path="/allres"
           history={props.history}
           ></Route>

        <Route           
          exact
          strict
           component={SuperAdminLogin}
           path="/salogin"
           history={props.history}
           ></Route>

        <Route           
          exact
          strict
           component={AdminDashBoard}
           path="/admindashboard"
           history={props.history}
           ></Route>

        <Route           
          exact
          strict
           component={RestaurantLogin}
           path="/reslogin"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={HomeRes}
           path="/reshome"
           history={props.history}
           ></Route>


<Route           
          exact
          strict
           component={RestaurantDashBoard}
           path="/restaurantdashboard"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={QrCode}
           path="/QrCode"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={QrCodeShow}
           path="/QrCodeShow"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={Home}
           path="/Home/:rid"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={Signin}
           path="/signin"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={Signup}
           path="/signup"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={Showcart}
           path="/showcart"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={MakePayment}
           path="/makepayment"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={OrderSubmitted}
           path="/ordersubmitted"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={Page1}
           path="/page1"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={Page2}
           path="/page2"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={ViewOrder}
           path="/orders"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={ViewOrder2}
           path="/orders2"
           history={props.history}
           ></Route>


<Route           
          exact
          strict
           component={CurrentOrder3}
           path="/currentorder3"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={OlderOrder}
           path="/olderorder1"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={UserProfile}
           path="/userprofile"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={SimplePaper}
           path="/slider"
           history={props.history}
           ></Route>




        </Router>
       
      
    </div>
  );
}

export default App;
