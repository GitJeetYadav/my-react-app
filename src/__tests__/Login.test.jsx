import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useMsal } from '@azure/msal-react';
import { useTranslation } from 'react-i18next';
import '@testing-library/jest-dom';
import Login from '../components/auth/login/Login';
import { setIsLoggedIn, setUserRole } from '../store/hooks';

jest.mock('@azure/msal-react', () => ({
  useMsal: jest.fn(),
  useIsAuthenticated: jest.fn(() => false),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: {
        isLoggedIn: false,
        user: null,
        userRole: null,
      },
    });
    useMsal.mockReturnValue({
      instance: {
        loginPopup: jest.fn(() => Promise.resolve({ accessToken: 'testAccessToken', idToken: 'testIdToken', extExpiresOn: '2025-12-12' })),
      },
    });
  });

  test('renders login form with email and password fields', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Login />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText('login.enterEmail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('login.enterPassword')).toBeInTheDocument();
    expect(screen.getByTestId('handle-signin')).toBeInTheDocument();
    expect(screen.getByTestId('handle-azure')).toBeInTheDocument();
  });

  test('validates email and password fields', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Login />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByTestId('handle-signin');
    fireEvent.click(submitButton);

    expect(screen.getByText('login.emailRequrid')).toBeInTheDocument();
    expect(screen.getByText('login.passwordRequrid')).toBeInTheDocument();
  });

  test('calls handleAzureLogin on Azure login button click', async () => {
    const { instance } = useMsal();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Login />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    const azureLoginButton = screen.getByTestId('handle-azure');
    fireEvent.click(azureLoginButton);

    expect(instance.loginPopup).toHaveBeenCalledWith({ scopes: ['User.Read'] });
  });

  test('dispatches login actions on successful Azure login', async () => {
    const dispatchMock = jest.spyOn(store, 'dispatch');

    const { instance } = useMsal();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Login />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    const azureLoginButton = screen.getByTestId('handle-azure');
    await fireEvent.click(azureLoginButton);

    expect(instance.loginPopup).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(setIsLoggedIn(true));
    expect(dispatchMock).toHaveBeenCalledWith(setUserRole('admin'));
  });

  test('displays error message for invalid email format', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Login />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('login.enterEmail');
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    const submitButton = screen.getByTestId('handle-signin');
    fireEvent.click(submitButton);

    expect(screen.getByText('login.emailInvalid')).toBeInTheDocument();
  });

  test('displays error message for weak password', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Login />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('login.enterPassword');
    fireEvent.change(passwordInput, { target: { value: 'weakpass' } });
    const submitButton = screen.getByTestId('handle-signin');
    fireEvent.click(submitButton);

    expect(screen.getByText('login.passwordLenght')).toBeInTheDocument();
  });
});
