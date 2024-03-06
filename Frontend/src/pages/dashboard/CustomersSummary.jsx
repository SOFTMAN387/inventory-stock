import Chart from "react-apexcharts";

const defaultOptions = {
  toolbar: {
    show: false,
  },
  chart: {
    toolbar: {
      show: false,
    },
  },

  colors: ["#5f71e4", "#2dce88"],
  legend: {
    show: false,
  },
  stroke: {
    curve: "smooth",
  },
};

const CustomersSummary = ({
  data,
  type,
  labels,
  options,
}) => {
  return (
    <>
      <Chart
        series={data}
        type={type}
        height={300}
        options={Object.assign({}, defaultOptions, options, { labels })}
      ></Chart>
    </>
  );
};

export default CustomersSummary;
