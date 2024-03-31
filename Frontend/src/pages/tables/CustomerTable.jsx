import { Avatar, Space, Table, Typography } from "antd";
import useFetchData from "../../hooks/useFetchData";

function CustomersTable() {
  const {resultData,loader,error}=useFetchData('api/user/userlist');
  const allUsers=resultData?.findAllUsers;
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table
        loading={loader}
        columns={[
          {
            title: "Photo",
            dataIndex: "profilePicture",
            render: (val) => {
              return <Avatar src={val?.url} />;
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
        ]}
        dataSource={allUsers}
        pagination={{
          pageSize: 10,
        }}
      ></Table>
      {error&&<span>{error}</span>}
    </Space>
  );
}
export default CustomersTable;