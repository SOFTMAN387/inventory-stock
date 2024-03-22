import React from "react";
import { Link } from "react-router-dom";
import { View, Flex, useTheme,Text,SwitchField,Button } from "@aws-amplify/ui-react";
import "./Profile.css";
import useFetchData from "../../hooks/useFetchData";
const Profile = () => {
  // const id="65ed7bada708ba186741f4af";
  const {resultData,error}=useFetchData(`api/user/65ed7bada708ba186741f4af`);
  const userData=resultData?.findUser[0];
  console.log(userData);
  const { tokens } = useTheme();
  return (
    <>
      <div>
        <h2>Profile</h2>
      </div>
      <View maxWidth="100%" padding="0rem" minHeight="100vh">
        <Flex
          direction={{ base: "column", large: "row" }}
          alignItems="flex-start"
          gap={tokens.space.xl}
          marginBottom="30px"
        >
          <View
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            width={{ base: "100%", large: "100%" }}
            padding="1rem"
          >
          <Flex
        direction={{ base: "column", large: "row" }}
        alignItems="flex-start"
      >
        <div className="profile-header-image">
          <img alt="avatar" src={userData?.profilePicture}></img>
        </div>
        <div className="profile-header-text">
          <Text variation="primary" fontWeight={600} fontSize="18px">
            {userData?.firstname}  {userData?.lastname}
          </Text>
          <Text variation="tertiary">{userData?.email}</Text>
        </div>
      </Flex>
          </View>
        </Flex>

        <Flex
          direction={{ base: "column", large: "row" }}
          gap={tokens.space.xl}
          alignItems="flex-start"
        >
          <View
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            width={{ base: "100%", large: "40%" }}
            padding={{ base: "1em", large: "1.5rem" }}
          >
            <div className="profile-card-content">
      <Text fontWeight="600" fontSize="18px" marginBottom="14px">
        Profile Information
      </Text>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Full Name:
        </Text>
        <Text variation="tertiary">{userData?.firstname}  {userData?.lastname}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Phone:
        </Text>
        <Text variation="tertiary">{userData?.mobile}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Email:
        </Text>
        <Text variation="tertiary">{userData?.email} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Location:
        </Text>
        <Text variation="tertiary">United States</Text>
      </Flex>
      <div className="profile-card-edit">
        <Link to={`/admin/edit-profile/${userData?._id}`}> <Button marginLeft="auto">Edit</Button></Link>
       
      </div>
    </div>
          </View>
          <View
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            width={{ base: "100%", large: "40%" }}
            padding={{ base: "1em", large: "1.5rem" }}
          >
           <div className="profile-card-content">
      <Text fontWeight="600" fontSize="18px" marginBottom="18px">
        Profile Settings
      </Text>
      <SwitchField
        isDisabled={false}
        label="Item update notifications"
        labelPosition="end"
        defaultChecked={false}
      />

      <SwitchField
        isDisabled={false}
        label="Subscribe to newsletter"
        labelPosition="end"
        defaultChecked={true}
      />
    </div>
          </View>
        </Flex>
        {error&&<span>{error}</span>}
      </View>
    </>
  );
};

export default Profile;
