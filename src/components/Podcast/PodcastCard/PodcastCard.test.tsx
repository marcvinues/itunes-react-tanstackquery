import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { PodcastCard } from './PodcastCard';
import type { Podcast } from '../../../@types/interfaces/podcast';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PodcastCard', () => {
  const mockPodcast: Podcast = {
    id: '123',
    title: 'Test Podcast',
    author: 'Test Author',
    description: 'Test Description',
    imageUrl: 'https://example.com/image.jpg',
    category: 'Technology',
  };

  const renderComponent = (podcast: Podcast = mockPodcast) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PodcastCard podcast={podcast} />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the podcast card', () => {
      renderComponent();
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('should display the podcast title', () => {
      renderComponent();
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Podcast');
    });

    it('should display the podcast author', () => {
      renderComponent();
      expect(screen.getByText('Author: Test Author')).toBeInTheDocument();
    });

    it('should render the podcast image', () => {
      renderComponent();
      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
      expect(image).toHaveAttribute('alt', 'Test Podcast');
    });
  });

  describe('Navigation', () => {
    it('should navigate to podcast detail page on click', () => {
      renderComponent();

      const card = screen.getByRole('article');
      fireEvent.click(card);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/podcast/123');
    });

    it('should navigate with the correct podcast ID', () => {
      const customPodcast = { ...mockPodcast, id: '456' };
      renderComponent(customPodcast);

      const card = screen.getByRole('article');
      fireEvent.click(card);

      expect(mockNavigate).toHaveBeenCalledWith('/podcast/456');
    });
  });

  describe('Props', () => {
    it('should render different podcast data', () => {
      const anotherPodcast: Podcast = {
        id: '999',
        title: 'Another Podcast',
        author: 'Another Author',
        description: 'Another Description',
        imageUrl: 'https://example.com/another.jpg',
        category: 'Science',
      };

      renderComponent(anotherPodcast);

      expect(screen.getByText('Another Podcast')).toBeInTheDocument();
      expect(screen.getByText('Author: Another Author')).toBeInTheDocument();
    });
  });
});
