import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MeetHub application successfully', () => {
  render(<App />);
  const brandElement = screen.getByText(/MeetHub/i);
  expect(brandElement).toBeInTheDocument();
});