import { render, screen } from '@testing-library/react';
import {Connect} from './Connect'

test('renders MyComponent with text', () => {
  render(<Connect isConnected={true} connectorName='injected'  />);

  // Query the rendered component
  const component = screen.getByText('injected');

  // Assert that the component is rendered
  expect(component).toBeDefined();
});