import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getRequest } from '../service/apiService';

jest.mock("../service/apiService", () => ({
  getRequest: jest.fn(() => Promise.resolve([])),
}));

describe('API Requests', () => {
  let mock;

  // Set up a new mock instance before each test
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  // Reset mock after each test
  afterEach(() => {
    mock.reset();
  });

  it('should handle GET requests successfully', async () => {
    const endpoint = '/roleList';
    // const params = { key: 'value' };
    const mockData = [
        {
          "email": "admin@gmail.com",
          "role": "admin",
          "claims": [
            "viewDashboard",
            "editUser",
            "deleteUser",
            "addUser",
            "viewAdminCard",
            "viewDealerCard",
            "viewSupplierCard"
          ],
          "userName": "Admin John"
        },
        {
          "email": "dealer@gmail.com",
          "role": "dealer",
          "claims": ["viewDashboard", "editUser", "viewDealerCard"],
          "userName": "Dealer John"
        },
        {
          "email": "supplier@gmail.com",
          "role": "supplier",
          "claims": ["viewDashboard", "viewSupplierCard"],
          "userName": "Supplier John"
        }
      ];
  
    // Set up the mock response
    mock.onGet(endpoint).reply(200, mockData);
  
  
    // Make the GET request
    const response = await getRequest(endpoint);
  
    // Assertions
    expect(response).toEqual(mockData);
    expect(mock.history.get.length).toBe(0);
  });

  it('should throw an error for a failed GET request', async () => {
    const endpoint = 'http://localhost:5000/roleList';

    // Set up mock response for error
    mock.onGet(endpoint).reply(500);

    // Expect the getRequest function to throw an error
    await expect(getRequest(endpoint)).rejects.toThrowError();

    // Assertions
    expect(mock.history.get.length).toBe(1); // Ensure one GET request was made
    expect(mock.history.get[0].url).toBe(endpoint);
  });
  
});
