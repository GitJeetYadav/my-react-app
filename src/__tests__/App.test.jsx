import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('../RoutesPage', () => () => <div>Routes Page</div>);

describe('App Component', () => {
  test('renders App component ', () => {
    const { getByText } = render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );
    expect(getByText(/routes page/i)).toBeInTheDocument();
  });
});
