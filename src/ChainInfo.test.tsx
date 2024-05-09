import { render, screen } from '@testing-library/react';
import {ChainInfo} from './ChainInfo'

jest.mock('wagmi', () => ({
  useAccount: jest.fn(() => ({
      isConnected: true,
      chainId: '007',
      status: 'connected',
      chain: {name: 'toTheMoon'},
      address: 'x0123'
  })),
}));
test('renders MyComponent with text', () => {
   

  render(<ChainInfo />);

  // Query the rendered component
  const chainId = screen.getByText('007');
  const chainName = screen.getByText('toTheMoon');
  const address = screen.getByText('x0123');


  // Assert that the component is rendered
  expect(status).toBeDefined();
  expect(chainName).toBeDefined();
  expect(address).toBeDefined();
  expect(chainId).toBeDefined();



});