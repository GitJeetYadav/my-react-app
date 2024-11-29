import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ChakraProvider } from "@chakra-ui/react";
import Supplier from "../components/ui-components/supplier/Supplier";
import { useTranslation } from "react-i18next";
import { hasPermission, getUserRoleFromToken } from "../components/ui-components/authUtils";
import { setUserDataList } from "../store/hooks";
import { getRequest } from "../service/apiService";

jest.mock("react-i18next", () => ({
    useTranslation: jest.fn(() => ({
        t: (key) => key,
    })),
}));

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock("../components/ui-components/authUtils", () => ({
    hasPermission: jest.fn(),
    getUserRoleFromToken: jest.fn(),
}));

jest.mock("../service/apiService", () => ({
    getRequest: jest.fn(),
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

describe("Supplier Component", () => {
    const mockStore = configureStore([]);
    let store;
    const mockDispatch = jest.fn();

    beforeEach(() => {
        store = mockStore({
            userData: {
                dataList: [{ id: 1, name: "Supplier User" }],
            },
        });

        jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);
        jest.spyOn(require("react-redux"), "useSelector").mockImplementation((selector) =>
            selector(store.getState())
        );
        jest.spyOn(require("../components/ui-components/authUtils"), "getUserRoleFromToken").mockReturnValue("admin");
        jest.spyOn(require("../components/ui-components/authUtils"), "hasPermission").mockReturnValue(true);
        jest.spyOn(require("../service/apiService"), "getRequest").mockResolvedValue([
            { id: 1, name: "Fetched Supplier User" },
        ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the supplier list header", () => {
        render(
            <ChakraProvider>
                <Supplier />
            </ChakraProvider>
        );

        expect(screen.getByText("supplierList")).toBeInTheDocument();
    });

    it("renders the add supplier button if user has permission", () => {
        render(
            <ChakraProvider>
                <Supplier />
            </ChakraProvider>
        );

        const addButton = screen.getByTestId("add-admin");
        expect(addButton).toBeInTheDocument();
        expect(addButton).toHaveTextContent("supplier.addSupplier");
    });

    it("opens the add supplier modal when the button is clicked", () => {
        render(
            <ChakraProvider>
                <Supplier />
            </ChakraProvider>
        );

        const addButton = screen.getByTestId("add-admin");
        fireEvent.click(addButton);

        expect(screen.getByTestId("mock-add-modal")).toBeInTheDocument();
    });

    it("renders the user table with data from the store", () => {
        render(
            <ChakraProvider>
                <Supplier />
            </ChakraProvider>
        );

        expect(screen.getByTestId("mock-user-table")).toBeInTheDocument();
    });
});
