import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

test('Star Rating page', () => {
  render(<StarRating />);
  const processing = screen.getAllByText(/★/i);
  processing.forEach((n) => {
    expect(n).toBeInTheDocument();
  })
});
