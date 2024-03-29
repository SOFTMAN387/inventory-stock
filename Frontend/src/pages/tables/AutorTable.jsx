import { Avatar, Space, Table, Typography } from "antd";
import { useNavigate} from "react-router-dom";
import { View, Heading, ScrollView } from "@aws-amplify/ui-react";
import useFetchData from "../../hooks/useFetchData";
function AuthorTable() {
  const navigate = useNavigate();
  const {resultData,loader,error}=useFetchData('api/user/userlist');
  const allUsers=resultData?.findAllUsers;

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
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table
        loading={loader}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "First Name",
            dataIndex: "firstname",
          },
          {
            title: "LastName",
            dataIndex: "lastname",
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
            title: "Role",
            dataIndex: "role",
          },
        ]}
        dataSource={allUsers}
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