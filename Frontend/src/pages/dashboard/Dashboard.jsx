import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Grid,
  Flex,
  Card,
  Placeholder,
  useTheme,
} from "@aws-amplify/ui-react";
import { MdWeb, MdPermIdentity, MdRateReview, MdShoppingCartCheckout, MdOutlineRemoveShoppingCart } from "react-icons/md";

import MiniStatistics from "./MiniStatistics";
import TrafficSources from "./TrafficSources";
import SalesSummary from "./SalesSummary";
import TrafficSummary from "./TrafficSummary";
import CustomersSummary from "./CustomersSummary";
import "./Dashboard.css";
import { BASE_URL } from "../../config";
import { useSelector } from 'react-redux';

/// Mock Data
const barChartDataDemo = [
  {
    name: "Web",
    data: [
      11, 8, 9, 10, 3, 11, 11, 11, 12, 13, 2, 12, 5, 8, 22, 6, 8, 6, 4, 1, 8,
      24, 29, 51, 40, 47, 23, 26, 50, 26, 22, 27, 46, 47, 81, 46, 40,
    ],
  },
  {
    name: "Social",
    data: [
      7, 5, 4, 3, 3, 11, 4, 7, 5, 12, 12, 15, 13, 12, 6, 7, 7, 1, 5, 5, 2, 12,
      4, 6, 18, 3, 5, 2, 13, 15, 20, 47, 18, 15, 11, 10, 9,
    ],
  },
  {
    name: "Other",
    data: [
      4, 9, 11, 7, 8, 3, 6, 5, 5, 4, 6, 4, 11, 10, 3, 6, 7, 5, 2, 8, 4, 9, 9, 2,
      6, 7, 5, 1, 8, 3, 12, 3, 4, 9, 7, 11, 10,
    ],
  },
];

const lineChartData = [
  {
    name: "Mobile apps",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "Websites",
    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
  },
];


const customersData = [
  {
    name: "New Customers",
    data: [50, 60, 140, 190, 180, 230],
  },
];

const getChartData = () =>
  new Promise((resolve, reject) => {
    if (!barChartDataDemo) {
      return setTimeout(() => reject(new Error("no data")), 750);
    }

    setTimeout(() => resolve(Object.values(barChartDataDemo)), 750);
  });



const Dashboard = () => {
  const userToken=useSelector((state)=>state?.currentUser[0]?.token);
  const [barChartData, setBarChartData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [productStockData, setProductStockData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [revenueData, setRevenueData] = useState("");
  const [error,setError]=useState(false);

  const [trafficSourceData, setTrafficSourceData] = useState(null);
  const { tokens } = useTheme();
 // console.log(userData,productData,orderData);

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const productResponse=await axios.get(`${BASE_URL}/api/product/productlist`,{
          headers:{
                 Authorization:`Bearer ${userToken}`
             }
         });
        const userResponse=await axios.get(`${BASE_URL}/api/user/userlist`,{
          headers:{
                 Authorization:`Bearer ${userToken}`
             }
         });
        const orderResponse=await axios.get(`${BASE_URL}/api/order/orderlist`,{
          headers:{
                 Authorization:`Bearer ${userToken}`
             }
         });
         if(orderResponse?.status && productResponse?.status && userResponse?.status===200){
          setUserData(userResponse?.data?.findAllUsers);
          setOrderData(orderResponse?.data?.findAllOrders);
          setProductData(productResponse?.data?.findAllProducts);
          setProductStockData(productResponse?.data?.findAllProducts.filter(val=>val.quantity===0));
          const allRevenue=orderResponse?.data?.findAllOrders?.map(val=>val.totalAmount)?.reduce((total,current)=>{
            return total+current;
          },0);
         setRevenueData(allRevenue);
       }else{
           throw new Error(orderResponse?.message,productResponse?.message,userResponse?.message);
       }
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  },[userToken]);

  useEffect(() => {
    const doChartData = async () => {
      const result = await getChartData();
      setBarChartData(result);
      // console.log(result);
      setTrafficSourceData([112332, 123221, 432334, 342334, 133432]);
    };

    doChartData();
  }, []);

  return (
    <>
      <div>
        <h2>Dashboard</h2>
        {error&&<span>{error}</span>}
      </div>
      <View borderRadius="6px" maxWidth="100%" padding="0rem" minHeight="100vh">
        <Grid
          templateColumns={{ base: "1fr", large: "1fr 1fr 1fr" }}
          templateRows={{ base: "repeat(4, 10rem)", large: "repeat(4, 8rem)" }}
          gap={tokens.space.xl}
        >
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Customers"
              amount={userData?.length}
              icon={<MdPermIdentity />}
            />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics title="Orders" amount={orderData?.length} icon={<MdWeb />} />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Products"
              amount={productData?.length}
              icon={<MdShoppingCartCheckout />}
            />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Out Stock"
              amount={productStockData?.length}
              icon={<MdOutlineRemoveShoppingCart />}
            />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Revenue"
              amount={revenueData}
              icon={<MdRateReview />}
            />
          </View>

          <View columnSpan={[1, 1, 1, 2]} rowSpan={{ base: 3, large: 4 }}>
            <Card borderRadius="15px">
              <div className="card-title">Traffic Summary</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <div className="row">
                    <TrafficSummary
                      title="Traffic Summary"
                      data={barChartData}
                      type="bar"
                      labels={[
                        "2022-01-20",
                        "2022-01-21",
                        "2022-01-22",
                        "2022-01-23",
                        "2022-01-24",
                        "2022-01-25",
                        "2022-01-26",
                        "2022-01-27",
                        "2022-01-28",
                        "2022-01-29",
                        "2022-01-30",
                        "2022-02-01",
                        "2022-02-02",
                        "2022-02-03",
                        "2022-02-04",
                        "2022-02-05",
                        "2022-02-06",
                        "2022-02-07",
                        "2022-02-08",
                        "2022-02-09",
                        "2022-02-10",
                        "2022-02-11",
                        "2022-02-12",
                        "2022-02-13",
                        "2022-02-14",
                        "2022-02-15",
                        "2022-02-16",
                        "2022-02-17",
                        "2022-02-18",
                        "2022-02-19",
                        "2022-02-20",
                        "2022-02-21",
                        "2022-02-22",
                        "2022-02-23",
                        "2022-02-24",
                        "2022-02-25",
                        "2022-02-26",
                      ]}
                    />
                  </div>
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View>
          <View rowSpan={{ base: 1, large: 4 }}>
            <Card height="100%" borderRadius="15px">
              <div className="card-title">Traffic Sources</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <TrafficSources
                    title="Traffic Sources"
                    data={trafficSourceData}
                    type="donut"
                    labels={[
                      "Direct",
                      "Internal",
                      "Referrals",
                      "Search Engines",
                      "Other",
                    ]}
                  />
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View>

          <View columnSpan={[1, 1, 1, 2]} rowSpan={{ base: 3, large: 4 }}>
            <Card borderRadius="15px">
              <div className="card-title">Sales Summary</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <div className="row">
                    <SalesSummary
                      title="Sales Summary"
                      data={lineChartData}
                      type="line"
                      labels={[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ]}
                    />
                  </div>
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View>

          <View rowSpan={{ base: 1, large: 4 }}>
            <Card height="100%" borderRadius="15px">
              <div className="card-title">New Customers</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <div className="row">
                    <CustomersSummary
                      title="CutomersSummary"
                      data={customersData}
                      type="line"
                      labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                    />
                  </div>
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View>
        </Grid>
      </View>
    </>
  );
};

export default Dashboard;
