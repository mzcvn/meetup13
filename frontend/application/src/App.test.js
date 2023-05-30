import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Statistic from './Pages/Statistic';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Immersion Day/i);
  expect(linkElement).toBeInTheDocument();
});
