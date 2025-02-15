import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import WebApis from "../apis/WebApis";
import { setCartItemList, updateQuantity } from "../redux-config/CartItemSlice";

export default function ViewCart(){
    const {token,user} = useSelector((store)=>store.User);
    const {cartItemList,totalPrice} = useSelector((store)=>store.CartItems);
    const dispatch = useDispatch();
    useEffect(()=>{
      loadCartItems();
    },[]);
    const loadCartItems = async ()=>{
     try{ 
       let response = await axios.get(WebApis.VIEW_CART+user._id,{headers:{"Authorization":"Bearer "+token}});
       console.log(response.data);
       dispatch(setCartItemList(response.data.cart.cartItems));
     }
     catch(err){
      console.log(err);
     }
    }
    return <>
      <div className="container mt-5">
         <header className="bg-danger d-flex justify-content-center align-items-center" style={{height:"30px"}}>
          <h6 className="text-white" style={{margin:0}}>Cart Details</h6>
         </header>
         <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Product name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItemList.map((item,index)=><tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.productId.title}</td>
                  <td>{item.productId.brand ? item.productId.brand: "N/A"}</td>
                  <td>{item.productId.price}</td>
                  <td>
                    <input onChange={(event)=>dispatch(updateQuantity({qty: event.target.value,index}))} type="number" defaultValue="1" style={{width:"50px",height:"20px"}}/>
                  </td>
                  <td>{item.productId.price*item.productId.qty}</td>
                  <td><small className="text-danger">Remove</small></td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className="col-md-3 p-3 ml-4">
            <div className="" style={{height:"150px",boxShadow:"10px 10px 10px 10px black"}}>
              <h6 className="text-center bg-dark text-white p-2">Order Summery</h6>
              <div className="d-flex justify-content-between p-2">
                <small>Total Items</small>
                <small>{cartItemList.length}</small>
              </div>
              <div className="d-flex justify-content-between p-2">
                <small>Bill Amount</small>
                <small>{totalPrice.toFixed(2)} Rs.</small>
              </div>
              <button className="btn btn-success" style={{width:"100%"}}>Checkout</button>
            </div>
          </div>
         </div>
      </div>
    </>
}