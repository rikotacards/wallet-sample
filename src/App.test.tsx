import { render, screen } from '@testing-library/react';
import {Connect} from './Connect'
jest.mock('wagmi');

test('renders MyComponent with text', () => {
 
  render(<Connect />);

  // Query the rendered component
  const component = screen.getByText('Connect to a wallet to send assets');
  const connect1 = screen.getByText('connect1');
  const connect2 = screen.getByText('connect2');


  // Assert that the component is rendered
  expect(component).toBeDefined();
  expect(connect1).toBeDefined();
  expect(connect2).toBeDefined();


});