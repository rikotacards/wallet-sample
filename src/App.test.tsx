import { render, screen } from '@testing-library/react';
import {Connect} from './Connect'
import { useAccount } from 'wagmi';
jest.mock('wagmi');

test('renders MyComponent with text', () => {
  const {isConnected} = useAccount();
  console.log(isConnected)
  render(<Connect isConnected={isConnected} connectorName='injected'  />);

  // Query the rendered component
  const component = screen.getByText('Connect to a wallet to send assets');

  // Assert that the component is rendered
  expect(component).toBeDefined();
});