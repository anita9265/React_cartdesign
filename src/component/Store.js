import { configureStore } from '@reduxjs/toolkit'
import Productslice   from '../slice/productslice'

export default configureStore({
  reducer: {
    cart:Productslice
  },
})