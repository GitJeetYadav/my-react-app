import React from "react";
import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";
import Dashboard from "../components/ui-components/dashboard/Dashboard";
import DashboardCards from "../components/Cards/index";
import data from "../components/common/data.json";

// Mock dependencies
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));
jest.mock("react-apexcharts", () => jest.fn(() => <div data-testid="chart" />));
jest.mock("../components/Cards/index", () => jest.fn(() => <div data-testid="dashboard-cards" />));

describe("Dashboard Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("should render DashboardCards", () => {
    // Mock role and translation
    useSelector.mockReturnValue("admin");
    useTranslation.mockReturnValue({ t: jest.fn() });

    render(<Dashboard />);

    // Assert DashboardCards is rendered
    expect(screen.getByTestId("dashboard-cards")).toBeInTheDocument();
  });

  it("should render admin charts", () => {
    useSelector.mockReturnValue("admin");
    useTranslation.mockReturnValue({ t: jest.fn() });

    render(<Dashboard />);

    // Assert admin-specific charts are rendered
    expect(screen.getAllByTestId("chart").length).toBe(3); // Admin has 3 charts
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        options: data.adminChart.options,
        series: data.adminChart.series,
        type: "bar",
        height: 350,
      }),
      {}
    );
  });

  it("should render dealer chart", () => {
    useSelector.mockReturnValue("dealer");
    useTranslation.mockReturnValue({ t: jest.fn() });

    render(<Dashboard />);

    // Assert dealer-specific chart is rendered
    expect(screen.getByTestId("chart")).toBeInTheDocument();
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        options: data.dealerChart.options,
        series: data.dealerChart.series,
        type: "bar",
        height: 350,
      }),
      {}
    );
  });

  it("should render supplier chart", () => {
    useSelector.mockReturnValue("supplier");
    useTranslation.mockReturnValue({ t: jest.fn() });

    render(<Dashboard />);

    // Assert supplier-specific chart is rendered
    expect(screen.getByTestId("chart")).toBeInTheDocument();
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        options: data.supplierChart.options,
        series: data.supplierChart.series,
        type: "bar",
        height: 350,
      }),
      {}
    );
  });

  it("should render nothing if userRole is invalid", () => {
    useSelector.mockReturnValue("invalidRole");
    useTranslation.mockReturnValue({ t: jest.fn() });

    render(<Dashboard />);

    // Assert no charts are rendered
    expect(screen.queryByTestId("chart")).not.toBeInTheDocument();
    expect(Chart).not.toHaveBeenCalled();
  });
});
