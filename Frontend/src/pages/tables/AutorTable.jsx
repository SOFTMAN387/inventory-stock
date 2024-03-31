import { Avatar, Space, Table, Typography } from "antd";
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate} from "react-router-dom";
import { View, Heading, ScrollView,Button } from "@aws-amplify/ui-react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from '../../config';
import { useSelector } from 'react-redux';
function AuthorTable() {
  const userToken=useSelector((state)=>state?.currentUser[0]?.token);
  const [fetchData,setFetchData]=useState([]);
  const navigate = useNavigate();
  const {resultData,loader,error}=useFetchData('api/user/userlist');
  // const allUsers=resultData?.findAllUsers;


  const UpdateAdminStatus=async(role,_id)=>{
    try {
      let adminRole;
      if(role==="Super-Admin"){
        adminRole="Admin";
      }else{
        adminRole="Super-Admin";
      }
        const UpdateUserRole=await axios.patch(`${BASE_URL}/api/user/update-role/${_id._id}`,{
          "role":adminRole
        },{
          headers:{
                Authorization:`Bearer ${userToken}`
            }
        })  
        if(UpdateUserRole.status===200){
          navigate("/");
        }
    } catch (error) {
      console.log(error);
    }

  }
  

  const DeleteProduct=async(id)=>{
    if(id){
      try {
        const delAuthor= await axios.delete(`${BASE_URL}/api/user/delete/${id}`, {
            headers:{
                  Authorization:`Bearer ${userToken}`
              }
          })  
          if(delAuthor.status===200){
            setFetchData(author=>author.filter((auth)=>auth._id!==id));
            alert("Author Deleted Successfull!...");
          
          }else{
            alert("Failed to Delete!...");
          }
      } catch (error) {
        alert("You are't Authorized!...");
      }
    }
   
  }
  useEffect(()=>{
    setFetchData(resultData?.findAllUsers);
  },[resultData]);
  return (<>
     <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
      >
        <div className="Products-header-div">
        <Heading color="#333"> Basic Table </Heading>
        <button  onClick={() => navigate("/admin/add-author")} className="text-white inline-flex items-center bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
          <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            New Admin
        </button>
        </div>
       
        <br></br>
    <ScrollView width="100%">
    <Space size={20} direction="vertical">
      <Typography.Title level={5}>Authors</Typography.Title>
      <Table
        loading={loader}
        columns={[
          {
            title: "Photo",
            dataIndex: "profilePicture",
            render: (profilePicture) => {
              return <Avatar src={profilePicture?.url} />;
            },
          },
          {
            title: "First Name",
            dataIndex: "first_name",
          },
          {
            title: "LastName",
            dataIndex: "last_name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "mobile",
          },

          {
            title: "Profile",
            dataIndex: "profile",
          },
          {
            title: "Role",
            dataIndex: "role",
          },
          {
            title: "Super-Admin",
            dataIndex:"role",
            key:"_id",
            render: (role,_id) => {
              return  <label className="relative inline-flex items-center me-5 cursor-pointer" 
              onClick={()=>UpdateAdminStatus(role,_id)}
              >
              <input type="checkbox" value="" className="sr-only peer"  checked={role==="Super-Admin"?"checked":""} />
                  {/* {users?.role==="admin"? <input type="checkbox" value="" className="sr-only peer" adminSwitch />:
                  <input type="checkbox" value={users?.role} className="sr-only peer" onChange={(e)=>setAdminSwitch(e.target.value)}  />} */}
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 
                  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">
                  </div>
                  </label>;
            },
          },
          {
            title: "Edit",
            dataIndex: "_id",
            render: (id) => {
              return <Button className="action-btn-edit" onClick={() => navigate(`/admin/edit-user/${id}`)}>Edit</Button>;
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
        dataSource={fetchData}
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
}
export default AuthorTable;