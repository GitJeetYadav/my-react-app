import React from "react";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";
import { useSelector } from 'react-redux';
import "./Dashboard.css";
import DashboardCards from "../../Cards";
import data from "../../common/data.json";
import { getUserRole } from "../../../store/hooks";
import {hasPermission, getUserRoleFromToken} from "../../ui-components/authUtils";

const Dashboard = () => {
  const { t } = useTranslation();
  const userRole = useSelector(getUserRole);

  // data for chart

  const series =
    userRole === "admin"
      ? data.adminChart.series
      : userRole === "dealer"
      ? data.dealerChart.series
      : data.supplierChart.series;

  const options =
    userRole === "admin"
      ? data.adminChart.options
      : userRole === "dealer"
      ? data.dealerChart.options
      : data.supplierChart.options;

  return (
    <div className="dashboard-container">
      <DashboardCards />
      {/* for admin data  */}
      {userRole === "admin" && (
        <div className="chart-container">
          <div className="chart">
            <Chart options={options} series={series} type="bar" height={350} />
          </div>
           <div className="chart">
            <Chart options={data.dealerChart.options} series={ data.dealerChart.series} type="bar" height={350} />
           </div>
           <div className="chart">
            <Chart options={data.supplierChart.options} series={ data.supplierChart.series} type="bar" height={350} />
           </div>
        </div>

      )}
      {/* for dealer data  */}
      {userRole === "dealer" && (
        <div className="chart">
          <Chart options={options} series={series} type="bar" height={350} />
        </div>
      )}
      {/* for supplier data  */}
      {userRole === "supplier" && (
        <div className="chart">
          <Chart options={options} series={series} type="bar" height={350} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
