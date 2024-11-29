import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/common/sidebar/Sidebar';
import data from "../components/common/data.json";

// Mock translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock Redux
const mockStore = configureStore([]);
const initialState = {
  data: {
    userRole: 'admin',
  },
};

// Mock menu data in data.json
data.menuList = [
  {
    "name": "Dashboard",
    "link": "/apps/dashboard",
    "icon": "dashboardIcon"
  },
  {
    "name": "Admin List",
    "link": "/apps/adminlist",
    "icon": "deviceOnboardingIcon"
  },
  {
    "name": "Dealer List",
    "link": "/apps/dealerlist",
    "icon": "deviceOnboardingIcon"
  },
  {
    "name": "Supplier List",
    "link": "/apps/supplierlist",
    "icon": "deviceOnboardingIcon"
  }
];
data.admin = ['Dashboard', 'Admin List', "Supplier List", "Dealer List"];

describe('Sidebar', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  const renderSidebar = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Sidebar />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

  test('renders Sidebar with user image and role', () => {
    renderSidebar();

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(initialState.data.userRole.toUpperCase())).toBeInTheDocument();
  });

  test('renders menu items based on user role', () => {
    renderSidebar();

    data.menuList.forEach((menuItem) => {
      if (data[initialState.data.userRole].includes(menuItem.name)) {
        expect(screen.getByText(menuItem.name)).toBeInTheDocument();
      }
    });
  });

  test('displays "Crud Operations" heading', () => {
    renderSidebar();
    expect(screen.getByText('Crud Operations')).toBeInTheDocument();
  });
});

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import '@testing-library/jest-dom';
// import Sidebar from '../components/common/sidebar/Sidebar';
// import data from "../components/common/data.json";
// import { ChakraProvider } from '@chakra-ui/react';

// // Mock useTranslation hook
// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key) => key,
//   }),
// }));

// // Mock localStorage
// const mockGetItem = jest.fn();
// jest.spyOn(Storage.prototype, 'getItem').mockImplementation(mockGetItem);

// describe("Sidebar Component", () => {
//   beforeEach(() => {
//     mockGetItem.mockReturnValue("admin"); // Set userRole as "admin"
//   });

//   afterEach(() => {
//     mockGetItem.mockClear(); // Clear mocks after each test
//   });
//   test("renders sidebar and header elements correctly", () => {
//     mockGetItem.mockReturnValue("admin"); // Mock userRole as 'admin'
//     render(
//       <ChakraProvider>
//         <Router>
//           <Sidebar />
//         </Router>
//       </ChakraProvider>
//     );

//     // Check if sidebar container is rendered
//     expect(screen.getByTestId("sidebar-container")).toBeInTheDocument();
    
//     // Check for translations
//     expect(screen.getByText("login.crudOperations")).toBeInTheDocument();

//     // Check if the profile info is displayed
//     expect(screen.getByAltText("logo")).toBeInTheDocument();
//     expect(screen.getByText("ADMIN")).toBeInTheDocument();
//   });

//   test("renders menu items based on userRole", () => {
//     // Mock userRole as 'admin' with specific permissions
//     mockGetItem.mockReturnValue("admin");

//     render(
//       <ChakraProvider>
//         <Router>
//           <Sidebar />
//         </Router>
//       </ChakraProvider>
//     );

//     // Check if only allowed menu items for the 'admin' role are displayed
//     const allowedLinks = data.admin; // Assuming 'admin' is an array in data.json

//     allowedLinks.forEach((linkName) => {
//       expect(screen.getByText(linkName)).toBeInTheDocument();
//     });

//     // Check that restricted items are not rendered
//     const restrictedLinks = Object.keys(data)
//       .filter(role => role !== "admin")
//       .flatMap(role => data[role]);

//     restrictedLinks.forEach((linkName) => {
//       expect(screen.queryByText(linkName)).not.toBeInTheDocument();
//     });
//   });

//   test("renders translated menu items", () => {
//     mockGetItem.mockReturnValue("admin");

//     render(
//       <ChakraProvider>
//         <Router>
//           <Sidebar />
//         </Router>
//       </ChakraProvider>
//     );

//     // Check if translated items are displayed for each menu item
//     expect(screen.getByText("common.dashboard")).toBeInTheDocument();
//     expect(screen.getByText("common.adminList")).toBeInTheDocument();
//     expect(screen.getByText("common.dealerList")).toBeInTheDocument();
//     expect(screen.getByText("common.supplierList")).toBeInTheDocument();
//   });
// });
