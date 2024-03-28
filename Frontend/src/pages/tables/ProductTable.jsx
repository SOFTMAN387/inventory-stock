import React,{useState} from 'react';
// import { getInventory } from '../../Api/ApiData';
import "./table.css";
import { View, Heading, ScrollView ,Menu, MenuButton } from "@aws-amplify/ui-react";
import { Space, Table,Avatar,Rate, Button } from 'antd';
import useFetchData from "../../hooks/useFetchData";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { mockSongsData } from "../../data/mock";

import { MdArrowDropDown } from 'react-icons/md';
import axios from 'axios';
import { BASE_URL } from '../../config';

const BasicTable = () => {
  const navigate=useNavigate();
  const userToken=useSelector((state)=>state?.currentUser[0]?.token);
  const {resultData,loader,error}=useFetchData('api/product/productlist');
  const allProducts=resultData?.findAllProducts;
  console.log(allProducts);
  const [outStockProducts,setOutStockProducts]=useState([]);
  const outStock=()=>{
    try {
      const outStock=allProducts.filter((item)=>{
        return item.quantity===0;
      });

      setOutStockProducts(outStock);
    } catch (error) {
      console.log(error);
      
    }
  }
  

  const DeleteProduct=async(id)=>{
    if(id){
      try {
        const delProduct= await axios.delete(`${BASE_URL}/api/product/delete/${id}`, {
            headers:{
                  Authorization:`Bearer ${userToken}`
              }
          })  
          if(delProduct){
            alert("Product Deleted Successfull!...");
          
          }
      } catch (error) {
        alert("You are't Authorized!...");
      }
    }
   
  }

  return (
    <>
        <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
      >
        <div className="Products-header-div">
        <Heading color="#333">Product Lists</Heading>
        <button onClick={() => navigate("/admin/add-product")} className="text-white inline-flex items-center bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
          <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            Add Product
        </button>
       </div>
        <br></br>
        <Menu
        menuAlign="start"
        trigger={
          <MenuButton variation="menu" style={{backgroundColor:"teal",color:"#fff"}}>
            <h4>Stocks</h4><span><MdArrowDropDown/></span>
          </MenuButton>
        }
      >
        <Button className='menu-items'><a href="/admin/products">Available</a></Button>
        <Button onClick={outStock}>out of stock</Button>
      </Menu>
    <ScrollView width="100%">
        <Space size={20} direction="vertical">
      <Table
        loading={loader}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "productImage",
            render: (val) => {
              return <Avatar src={val.url} />;
            },
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>Rs/-{value}</span>,
          },
          {
            title: "Rating",
            dataIndex: "rating",
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Stock",
            dataIndex: "quantity",
          },

          {
            title: "Brand",
            dataIndex: "sub_category",
          },
          {
            title: "Category",
            dataIndex: "category",
          },
          {
            title: "Description",
            dataIndex: "description",
          },
          {
            title: "Edit",
            dataIndex: "_id",
            render: (id) => {
              return <Button className="action-btn-edit" onClick={() => navigate(`/admin/edit-product/${id}`)}>Edit</Button>;
            },
          },
          {
            
            title: "Delete",
            dataIndex: "_id",
            render: (id) => {
              return <Button style={{backgroundColor:"red",color:"white"}} onClick={()=>DeleteProduct(id)}>Delete</Button>;
            },
          },
        ]}
        
        dataSource={outStockProducts.length>0?outStockProducts:allProducts}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      {error&&<span>{error}</span>}
    </Space>
   </ScrollView>
      </View>
     
    </>
  );
};

export default BasicTable;
