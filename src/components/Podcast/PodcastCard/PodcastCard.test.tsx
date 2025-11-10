import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PodcastCard } from './PodcastCard';
import { Podcast } from '../../../@types/interfaces/podcast';
import React from 'react';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockPodcast: Podcast = {
  id: '1',
  title: 'Test Podcast',
  author: 'Test Author',
  description: 'Test Description',
  imageUrl: 'https://example.com/image.jpg',
  category: 'Technology',
};

describe('PodcastCard', () => {
  it('renders podcast info', () => {
    render(
      <BrowserRouter>
        <PodcastCard podcast={mockPodcast} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Podcast')).toBeInTheDocument();
    expect(screen.getByText('Author: Test Author')).toBeInTheDocument();
  });

  it('navigates on click', () => {
    render(
      <BrowserRouter>
        <PodcastCard podcast={mockPodcast} />
      </BrowserRouter>
    );

    const card = screen.getByRole('article'); // usar el role adecuado
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith('/podcast/1');
  });
});
