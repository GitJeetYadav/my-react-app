import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Admin from "../components/ui-components/admin/Admin";
import { ChakraProvider } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { getRequest } from "../service/apiService";
import { hasPermission, getUserRoleFromToken } from "../components/ui-components/authUtils";
import {addModal} from '../components/common/modal/AddModal'
import table from "../components/common/table/Table"

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
describe("Admin Component", () => {
  const mockStore = configureStore([]);
  let store;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    store = mockStore({
      userData: {
        dataList: [{ id: 1, name: "Admin User" }],
      },
    });

    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(require("react-redux"), "useSelector").mockImplementation((selector) =>
      selector(store.getState())
    );
    jest.spyOn(require("../service/apiService"), "getRequest").mockResolvedValue([
      { id: 2, name: "New Admin" },
    ]);
    jest.spyOn(require("../components/ui-components/authUtils"), "getUserRoleFromToken").mockReturnValue("admin");
    jest.spyOn(require("../components/ui-components/authUtils"), "hasPermission").mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it("renders the admin list header", () => {
    render(
        <ChakraProvider>
          <Admin />
        </ChakraProvider>
    );

    expect(screen.getByText("adminList")).toBeInTheDocument();
  });

  it("renders the add admin button if user has permission", () => {
    render(
        <ChakraProvider>
          <Admin />
        </ChakraProvider>
    );

    const addButton = screen.getByTestId("add-admin");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("admin.addAdmin");
  });

  it("calls the API to fetch users on mount", async () => {
    render(
        <ChakraProvider>
          <Admin />
        </ChakraProvider>
    );

    expect(getRequest).toHaveBeenCalledWith("/adminDataLists");
  });

  it("opens the add admin modal when the button is clicked", () => {
    render(
        <ChakraProvider>
          <Admin />
        </ChakraProvider>
    );

    const addButton = screen.getByTestId("add-admin");
    fireEvent.click(addButton);

    expect(screen.getByText("admin.addAdmin")).toBeInTheDocument();
  });
});
