import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addItem: (state,action)=>{
            const existingItem = state.items.find((item)=> item.info.id === action.payload.info.id);
            if(existingItem){
                existingItem.quantity +=1;
            }
            else{
                state.items.push({...action.payload,quantity:1});
            }
           
        },
        removeItem:(state,action)=>{

        const existingItem = state.items.find((item)=> item.info.id === action.payload.info.id);
        if(existingItem){
            if(existingItem.quantity >1){
                existingItem.quantity -=1;
            }
            else{
               state.items = state.items.filter((item)=> item.info.id !== action.payload.info.id); 
            }
        }
            
        },
        clearCart:(state)=>{
            state.items.length=0;
        }
    }
});

export const{addItem,removeItem,clearCart} = cartSlice.actions;

export default cartSlice.reducer; 