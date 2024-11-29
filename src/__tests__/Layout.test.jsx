// import React from "react";
// import { render, screen } from "@testing-library/react";
// import Layout from "../components/common/layout/Layout";
// import Sidebar from "../sidebar/Sidebar";
// import HeaderComponent from "../../auth/header/Header";

// jest.mock("../sidebar/Sidebar", () => () => <div data-testid="sidebar">Sidebar Mock</div>);
// jest.mock("../../auth/header/Header", () => () => <div data-testid="header">Header Mock</div>);

// describe("Layout Component", () => {
//   it("renders Layout component with Sidebar and Header", () => {
//     render(
//       <Layout>
//         <div data-testid="child-content">Child Content</div>
//       </Layout>
//     );

//     // Check if main wrapper is rendered
//     expect(screen.getByTestId("main-wrapper")).toBeInTheDocument();

//     // Check if Sidebar is rendered
//     expect(screen.getByTestId("sidebar")).toBeInTheDocument();

//     // Check if HeaderComponent is rendered
//     expect(screen.getByTestId("header")).toBeInTheDocument();

//     // Check if children content is rendered
//     expect(screen.getByTestId("child-content")).toBeInTheDocument();
//   });

//   it("renders without children", () => {
//     render(<Layout />);

//     // Check if main wrapper is rendered
//     expect(screen.getByTestId("main-wrapper")).toBeInTheDocument();

//     // Check if Sidebar is rendered
//     expect(screen.getByTestId("sidebar")).toBeInTheDocument();

//     // Check if HeaderComponent is rendered
//     expect(screen.getByTestId("header")).toBeInTheDocument();

//     // Ensure children content is absent
//     expect(screen.queryByTestId("child-content")).not.toBeInTheDocument();
//   });
// });

import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../components/common/layout/Layout";

jest.mock("../components/common/sidebar/Sidebar", () => (
  <div data-testid="mocked-sidebar" />
));
jest.mock("../components/auth/header/Header", () => (
  <div data-testid="mocked-header" />
));


describe("Layout Component", () => {
  it("renders children inside the page body", () => {
    const { getByText } = render(<Layout children={"Test Children"} />);
    expect(getByText("Test Children")).toBeInTheDocument();
  });

  it("renders Sidebar, Header, and Footer components", () => {
    render(<Layout children={"Test Children"} />);

    expect(screen.getByTestId("mocked-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-header")).toBeInTheDocument();
  });

  it("renders main wrapper with the correct class", () => {
    render(<Layout children={"Test Children"} />);
    expect(screen.getByTestId("main-wrapper")).toHaveClass("page");
  });
});
