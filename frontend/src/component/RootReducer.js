

const initialState={
    cart:{},
    client:{},
    res:{}
    
}

export default function RootReducer(state = initialState, action){
    //alert("above switch")

 switch(action.type)
 {
    
    case "ADD_RES":
        {
         state.res[action.payload[0]]=action.payload[1]
         //alert("hello")
         return {cart:state.cart,client:state.client,res:state.res}
        }
    
    case "ADD_CLIENT":
        {
         state.client[action.payload[0]]=action.payload[1]
         //alert("hello")
         return {cart:state.cart,client:state.client,res:state.res}
        }
    case "ADD_ITEM":

        {
         //alert("hey")
         state.cart[action.payload[0]]=action.payload[1]
         //alert("hello")
         return {cart:state.cart,client:state.client,res:state.res}

        }

    case "REMOVE_ITEM":
        {
         delete state.cart[action.payload]
         //console.log(state.cart)
         return {cart:state.cart,client:state.client,res:state.res}
        }

    case "REMOVE_USER":
        {
           
            delete state.client[action.payload]
            //console.log(state.cart)
           
            return {cart:state.cart,client:state.client,res:state.res}
        }


    default:
        {
         //alert("bye")
        return state    }
 }

}