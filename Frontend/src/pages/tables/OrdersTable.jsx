import { Space, Table, Typography, Button } from 'antd';
import { View, ScrollView } from "@aws-amplify/ui-react";
import useFetchData from '../../hooks/useFetchData';
import { useNavigate} from "react-router-dom";
const OrdersTable = () => {
  const navigate=useNavigate();
  const {resultData,loader,error}=useFetchData('api/order/orderlist');
  const allOrders=resultData?.findAllOrders;

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
            render: () => {
              return <Button className="action-btn-edit" onClick={() => navigate("/admin/product-view")}>View</Button>;
            },
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
        dataSource={allOrders}
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