import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ChakraProvider } from "@chakra-ui/react";
import Dealer from "../components/ui-components/dealer/Dealer";
import { useTranslation } from "react-i18next";
import { getRequest } from "../service/apiService";
import { hasPermission, getUserRoleFromToken } from "../components/ui-components/authUtils";

jest.mock("../service/apiService", () => ({
  getRequest: jest.fn(),
}));

jest.mock("../components/ui-components/authUtils", () => ({
  hasPermission: jest.fn(),
  getUserRoleFromToken: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(() => ({
    t: (key) => key,
  })),
}));

jest.mock("../components/common/modal/AddModal", () => {
    return function MockAddModal() {
      return <div data-testid="mock-add-modal">Mock AddModal</div>;
    };
  });
  
  jest.mock("../components/common/table/Table", () => {
    return function MockUserTable() {
      return <div data-testid="mock-user-table">Mock UserTable</div>;
    };
  });
  

describe("Dealer Component", () => {
  const mockStore = configureStore([]);
  let store;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    store = mockStore({
      userData: {
        dataList: [{ id: 1, name: "Dealer User" }],
      },
    });

    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(require("react-redux"), "useSelector").mockImplementation((selector) =>
      selector(store.getState())
    );
    jest.spyOn(require("../service/apiService"), "getRequest").mockResolvedValue([
      { id: 2, name: "New Dealer" },
    ]);
    jest.spyOn(require("../components/ui-components/authUtils"), "getUserRoleFromToken").mockReturnValue("admin");
    jest.spyOn(require("../components/ui-components/authUtils"), "hasPermission").mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dealer list header", () => {
    render(
        <ChakraProvider>
          <Dealer />
        </ChakraProvider>
    );

    expect(screen.getByText("dealerList")).toBeInTheDocument();
  });

  it("renders the add dealer button if user has permission", () => {
    render(
        <ChakraProvider>
          <Dealer />
        </ChakraProvider>
    );

    const addButton = screen.getByTestId("add-admin");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("dealer.addDealer");
  });

  it("calls the API to fetch dealers on mount", async () => {
    render(
        <ChakraProvider>
          <Dealer />
        </ChakraProvider>
    );

    expect(getRequest).toHaveBeenCalledWith("/dealerDataLists");
  });

  it("opens the add dealer modal when the button is clicked", () => {
    render(
        <ChakraProvider>
          <Dealer />
        </ChakraProvider>
    );

    const addButton = screen.getByTestId("add-admin");
    fireEvent.click(addButton);

    expect(screen.getByTestId("mock-add-modal")).toBeInTheDocument();
  });

  it("renders the user table with data from the store", () => {
    render(
        <ChakraProvider>
          <Dealer />
        </ChakraProvider>
    );

    expect(screen.getByTestId("mock-user-table")).toBeInTheDocument();
  });
});
