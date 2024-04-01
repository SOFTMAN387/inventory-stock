import { Space, Table, Typography, Button } from 'antd';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { View, ScrollView } from "@aws-amplify/ui-react";
import useFetchData from '../../hooks/useFetchData';
import { useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../config';
const OrdersTable = () => {
  const navigate=useNavigate();
  const {resultData,loader,error}=useFetchData('api/order/orderlist');
  const userToken=useSelector((state)=>state?.currentUser[0]?.token);
  const [fetchData,setFetchData]=useState([]);
 // const allOrders=resultData?.findAllOrders;

console.log(fetchData);
  
  const DeleteOrder=async(id)=>{
    if(id){
      try {
        const delOrder= await axios.delete(`${BASE_URL}/api/order/delete/${id}`, {
            headers:{
                  Authorization:`Bearer ${userToken}`
              }
          })  
          if(delOrder.status===200){
            setFetchData(orders=>orders.filter((o)=>o._id!==id));
            alert("order Deleted Successfull!...");
          
          }
      } catch (error) {
        alert("You are't Authorized!...");
      }
    }
   
  }



  const UpdateOrderStatus=async(ord_status,_id)=>{
    try {
      let orderStatus;
      if(ord_status==="pending"){
        orderStatus="shipping";
      } else if(ord_status==="shipping"){
        orderStatus="inProgress";
      }else if(ord_status==="inProgress"){
        orderStatus="delivered";
      }else{
        orderStatus="confirmed";
      }
        const UpdateOrderStatus=await axios.patch(`${BASE_URL}/api/order/update-order-status/${_id}`,{
          "userOrderStatus":orderStatus
        },{
          headers:{
                Authorization:`Bearer ${userToken}`
            }
        })  
        if(UpdateOrderStatus.status===200){
          navigate("/admin/orders");
        }
        console.log(UpdateOrderStatus);
    } catch (error) {
      console.log(error);
    }

  }




  useEffect(()=>{
    setFetchData(resultData?.findAllOrders);
  },[resultData]);

  return (
   <>
      <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
      >
        <br></br>
    <ScrollView width="100%">
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Recent Orders</Typography.Title>
      <Table
        loading={loader}
        columns={[
          {
            title: "#ID",
            dataIndex: "_id"
          },
          {
            title: "User ID",
            dataIndex: "userId",
            render: (value) => <span>{value?.slice(-5)}</span>,
          },
          {
            title: "Total",
            dataIndex: "totalAmount",
            render: (value) => <span>Rs/-{value}</span>,
          },
          {
            title: "Payment",
            dataIndex: "paymentMode",
            render: (value) => <span>{value}</span>,
          },
          {
            title: "paidToken",
            dataIndex: "paidToken",
            render: (value) => <span>#ID{value?.paidId?.slice(-5)}</span>,
          },
          {
            title: "upi ID",
            dataIndex: "paidToken",
            render: (value) => <span>#ID{value?.upiId?.slice(-5)}</span>,
          },
          {
            title: "Dettails",
            dataIndex:"_id",
            render: (id) => {
              return <Button className="action-btn-edit" onClick={() => navigate(`/admin/order-view/${id}`)}>View</Button>;
            },
          },
          {
            title: "Status",
            dataIndex:"userOrderStatus",
            key:"_id",
            width: 180,
            minWidth: 120,
           render:(userOrderStatus,_id)=>{
            return(<>{
              userOrderStatus==="confirmed"?<Button  style={{backgroundColor:"rgba(70, 200, 228, 0.5)"}}>{userOrderStatus}</Button>:(<>
              <span>{userOrderStatus}</span>
              <Button onClick={()=>UpdateOrderStatus(userOrderStatus,_id?._id)} style={{backgroundColor:"rgba(34, 140, 228, 0.5)",marginLeft:"8px"}}>Next</Button>
              </>)
            }
                
                
            </>)
           }
          },
        
          {
            title: "DELETE",
            dataIndex:"_id",
            render:(id)=>{
            return(<Button style={{backgroundColor:"red",color:"white"}} onClick={()=>DeleteOrder(id)}>Delete</Button>)
           }
          },
        ]}
        dataSource={fetchData}
        pagination={{
          pageSize: 4,
        }}
      ></Table>
      {error&& <span>{error}</span>}
    </Space>
    </ScrollView>
      </View>
     
   </>
  )
}

export default OrdersTable;