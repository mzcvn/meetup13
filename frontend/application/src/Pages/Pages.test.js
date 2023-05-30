import { render, screen } from '@testing-library/react';
import Home from './Home';
import NotFound from './NotFound';
import Statistic from './Statistic';


test('Home Page', () => {
  render(<Home />);
  const home = screen.getByText(/Please let us now from scale 1-5, how do you feel about this event/i);
  expect(home).toBeInTheDocument();
});

test('Not Found Page', () => {
  render(<NotFound />);
  const notFound = screen.getByText(/Pages Not Found/i);
  expect(notFound).toBeInTheDocument();
});

test('Statistic Page', () => {
  render(<Statistic />);
  const statistic = screen.getByText(/Thank you for joining Immersion Day/i);
  expect(statistic).toBeInTheDocument();
});

test('Not include informal word', () => {
  render(<Home />)
  const informalWord = ["BadAss", "Dope"]
  informalWord.forEach((n) => {
    const word = screen.queryByText(new RegExp(n, "i"))
    expect(word).not.toBeInTheDocument()
  })
})