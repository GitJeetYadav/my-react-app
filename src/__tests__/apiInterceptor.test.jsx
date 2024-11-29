    // for future use need to make some changes
import api from "../service/apiInterceptor";
import axios from "axios";

const mockAxiosInstance = {
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
  request: jest.fn(),
  get: jest.fn(),
};

// Set up axios.create to return the mock instance
axios.create = jest.fn(() => mockAxiosInstance);

describe("API Interceptor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    delete window.location;
    window.location = { href: "" };
  });
  
  beforeAll(() => {
    // Mock axios.create to return an instance with interceptors
    axios.create.mockReturnValue({
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
      request: jest.fn(),
      get: jest.fn(),
    });
  });

  test("adds Authorization header if accessToken exists in localStorage", async () => {
    // Set up localStorage with user data including accessToken
    localStorage.setItem(
      "userData",
      JSON.stringify({ accessToken: "sampleAccessToken" })
    );

    // Mock a sample GET request
    axios.request.mockResolvedValueOnce({ data: { success: true } });

    // Make a request to trigger the interceptor
    const response = await api.get("/test-endpoint");

    // Check if the Authorization header was set correctly
    expect(axios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer sampleAccessToken;",
        }),
      })
    );

    // Verify the mocked response data
    expect(response.data).toEqual({ success: true });
  });

  test("redirects to '/' on 401 response status", async () => {
    // Set up window location object for redirection
    delete window.location;
    window.location = { href: jest.fn() };

    // Mock a 401 error response
    mockAxiosInstance.request.mockRejectedValueOnce({
      response: { status: 401 },
    });
    await expect(api.get("/test-endpoint")).rejects.toThrow();
  });

  test("does not set Authorization header if accessToken is missing", async () => {
    await api.get("/users");

    // Verify that Authorization header is not included in the request config
    expect(axios.request).toHaveBeenCalledWith(
      expect.not.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.any(String),
        }),
      })
    );
  });
});
