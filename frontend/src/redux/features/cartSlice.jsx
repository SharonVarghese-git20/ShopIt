import { createSlice } from "@reduxjs/toolkit";

const initialState={
   cartItems:localStorage.getItem('cartItem')
   ?JSON.parse(localStorage.getItem('cartItem'))
   :[],

   shippingInfo:localStorage.getItem('shippingInfo')
   ?JSON.parse(localStorage.getItem('shippingInfo'))
   :{},

}

export const cartSlice=createSlice({
    initialState,
    name:"cartSlice",
    reducers:{
       setCartItems:(state,action)=>{
        const item =action.payload;
        
        const isItemExist=state.cartItems.find(
            (i)=>i.product===item.product
        );

        if(isItemExist){
          state.cartItems=state.cartItems.map((i)=>
        i.product === isItemExist.product ?item:i);
        }else{
            state.cartItems=[...state.cartItems,item];
        }
         localStorage.setItem("cartItem",JSON.stringify(state.cartItems))
       },
       removeCartItem:(state,action)=>{
        state.cartItems=state?.cartItems?.filter(
          (i)=>i.product!==action.payload);

          localStorage.setItem("cartItem",JSON.stringify(state.cartItems))

       },
       clearCart:(state,action)=>{
          localStorage.removeItem("cartItem")
          state.cartItems=[];

       },
       saveShippingInfo:(state,action)=>{
        state.shippingInfo=action.payload;

        localStorage.setItem("shippingInfo",JSON.stringify(state.shippingInfo))

       }
    },
});

export default cartSlice.reducer;

export const {setCartItems,removeCartItem,saveShippingInfo,clearCart }=cartSlice.actions