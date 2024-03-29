import React from "react";
import { Link } from "react-router-dom";
import { View, Flex, useTheme,Text,SwitchField,Button } from "@aws-amplify/ui-react";
import "../profile/Profile.css";
import { useSelector } from "react-redux";
const Setting = () => {
  // const id="65ed7bada708ba186741f4af";
  const authUser= useSelector((state) => state?.currentUser[0]?.user) || [];
  const { tokens } = useTheme();
  return (
    <>
      <div>
        <h2>Settings</h2>
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
          <img alt="avatar" src={authUser?.profilePicture?.url}></img>
        </div>
        <div className="profile-header-text">
          <Text variation="primary" fontWeight={600} fontSize="18px">
            {authUser?.first_name}  {authUser?.last_name}
          </Text>
          <Text variation="tertiary">{authUser?.email}</Text>
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
        <Text variation="tertiary">{authUser?.firstname}  {authUser?.lastname}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Phone:
        </Text>
        <Text variation="tertiary">{authUser?.mobile}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Email:
        </Text>
        <Text variation="tertiary">{authUser?.email} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Location:
        </Text>
        <Text variation="tertiary">United States</Text>
      </Flex>
      <div className="profile-card-edit">
        <Link to={`/admin/edit-profile/${authUser?._id}`}> <Button marginLeft="auto">Edit</Button></Link>
       
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
      </View>
    </>
  );
};

export default Setting;
