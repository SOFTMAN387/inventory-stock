import React from "react";
import { View, Flex, useTheme,Text } from "@aws-amplify/ui-react";
import "../profile/Profile.css";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
const OrderDetails = () => {
    const id=useParams().id;
 const {resultData,error}=useFetchData(`api/order/${id}`);
 const orderData=resultData?.findOrder[0];
  const { tokens } = useTheme();
  return (
    <>
      <div>
        <h2>OrderDetailss</h2>
        {error&&<span>{error}</span>}
      </div>
      <View maxWidth="100%" padding="0rem" minHeight="100vh">
        <Flex
          direction={{ base: "column", large: "row" }}
          alignItems="flex-start"
          gap={tokens.space.xl}
          marginBottom="30px"
        >
     {orderData?.userOrderData?.map((ord_data,index)=>{
     return(<>
         <View
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            width={{ base: "100%", large: "100%" }}
            padding="1rem"
            key={index}
          >
          <Flex
        direction={{ base: "column", large: "row" }}
        alignItems="flex-start"
      >
        <div className="profile-header-image">
          <img alt="avatar" src={ord_data?.productImage}></img>
        </div>
        <div className="profile-header-text">
          <Text variation="primary" fontWeight={600} fontSize="18px">
           #ID:{ord_data?._id.slice(-5)},{ord_data?.title}
          </Text>
          <Text variation="tertiary">QTY:{ord_data?.quantity}</Text>
          <Text variation="tertiary">Price:{ord_data?.price}</Text>
        </div>
      </Flex>
     </View>
            </>)
        })}
       
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
        Payment Information
      </Text>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Payment Token:
        </Text>
        <Text variation="tertiary">ID:{orderData?.paidToken.paidId} UPI:{orderData?.paidToken.upiId} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Payment Mode:
        </Text>
        <Text variation="tertiary">{orderData?.paymentMode}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Total Amount:
        </Text>
        <Text variation="tertiary">{orderData?.totalAmount} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Ordered By:
        </Text>
        <Text variation="tertiary">{orderData?.userId}</Text>
      </Flex>
    </div>
          </View>
          <View
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            width={{ base: "100%", large: "40%" }}
            padding={{ base: "1em", large: "1.5rem" }}
          >
            <div className="profile-card-content">
      <Text fontWeight="600" fontSize="18px" marginBottom="14px">
       Shipping Address
      </Text>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Name:
        </Text>
        <Text variation="tertiary">{orderData?.shippingAddress?.name} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Contact:
        </Text>
        <Text variation="tertiary">{orderData?.shippingAddress?.phone},{orderData?.shippingAddress?.email}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Address1:
        </Text>
        <Text variation="tertiary">ID:{orderData?.shippingAddress?.address1} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Address2:
        </Text>
        <Text variation="tertiary">ID:{orderData?.shippingAddress?.address2} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Location:
        </Text>
        <Text variation="tertiary">{orderData?.shippingAddress?.contry},{orderData?.shippingAddress?.state},{orderData?.shippingAddress?.city},pincode{orderData?.shippingAddress?.pincode}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Ordered Date:
        </Text>
        <Text variation="tertiary">{orderData?.createdAt}</Text>
      </Flex>
      <Flex >
        <Text variation="tertiary" fontWeight="600">
          Ordered Status:
        </Text>
        <Text variation="tertiary" style={{backgroundColor:"rgba(70, 200, 228, 0.5)"}}>{orderData?.userOrderStatus}</Text>
      </Flex>
    </div>
          </View>
        </Flex>
        <View
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            width={{ base: "100%", large: "40%" }}
            padding={{ base: "1em", large: "1.5rem" }}
          >
            <div className="profile-card-content">
      <Text fontWeight="600" fontSize="18px" marginBottom="14px">
       Billing Address
      </Text>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Name:
        </Text>
        <Text variation="tertiary">{orderData?.billingAddress?.name} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Contact:
        </Text>
        <Text variation="tertiary">{orderData?.billingAddress?.phone},{orderData?.billingAddress?.email}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Address1:
        </Text>
        <Text variation="tertiary">ID:{orderData?.billingAddress?.address1} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Address2:
        </Text>
        <Text variation="tertiary">ID:{orderData?.billingAddress?.address2} </Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Location:
        </Text>
        <Text variation="tertiary">{orderData?.billingAddress?.contry},{orderData?.billingAddress?.state},{orderData?.billingAddress?.city},pincode{orderData?.billingAddress?.pincode}</Text>
      </Flex>
    </div>
          </View>
      </View>
    </>
  );
};

export default OrderDetails;
