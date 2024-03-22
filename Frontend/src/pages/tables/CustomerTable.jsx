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