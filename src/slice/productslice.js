import { createSlice } from '@reduxjs/toolkit'

export const cartslice = createSlice({
  name: 'cart',
  initialState: {
    value: 0,
    cartdata:[]
  },
  
  reducers: {
    addcart:(state,action)=>{
        // console.log(action.payload)
        var d=[...state.cartdata,action.payload]
        state.cartdata=d;
        console.log(state.cartdata);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addcart} = cartslice.actions

export default cartslice.reducer