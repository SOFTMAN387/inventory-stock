import { Space, Table, Typography,Avatar, Button } from 'antd';
import React,{useState,useEffect} from 'react';
import { getOrders } from '../../Api/ApiData';
import { View, ScrollView } from "@aws-amplify/ui-react";
const OrdersTable = () => {
  const [loading,setLoading]=useState(true);
  const [orders,setOrders]=useState([]);
  useEffect(()=>{
    getOrders().then(res=>{
  setOrders(res?.products);
  setLoading(false);
})
  },[]);


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
        loading={loading}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "DiscountedPrice",
            dataIndex: "discountedPrice",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Total",
            dataIndex: "total",
          },
          {
            title: "Status",
           render:()=>{
            return(<>
                <span>Pending</span>
                <Button style={{backgroundColor:"rgba(34, 140, 228, 0.5)",marginLeft:"5px"}}>Next</Button>
            </>)
           }
          },
          {
            title: "DELETE",
            render:()=>{
            return(<Button style={{backgroundColor:"red",color:"white"}}>Delete</Button>)
           }
          },
        ]}
        dataSource={orders}
        pagination={{
          pageSize: 4,
        }}
      ></Table>
    </Space>
    </ScrollView>
      </View>
     
   </>
  )
}

export default OrdersTable;