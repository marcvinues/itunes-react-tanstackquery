import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PodcastInfo } from './PodcastInfo';
import type { PodcastDetail, Episode } from '../../../@types/interfaces/podcast';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PodcastInfo', () => {
  const mockEpisodes: Episode[] = [
    {
      id: 'ep1',
      podcastId: '123',
      title: 'Episode 1',
      description: 'First episode',
      audioUrl: 'https://example.com/ep1.mp3',
      duration: 3600,
      releaseDate: new Date('2024-01-01'),
    },
    {
      id: 'ep2',
      podcastId: '123',
      title: 'Episode 2',
      description: 'Second episode',
      audioUrl: 'https://example.com/ep2.mp3',
      duration: 2400,
      releaseDate: new Date('2024-01-08'),
    },
  ];

  const mockPodcast: PodcastDetail = {
    id: '123',
    title: 'Test Podcast',
    author: 'Test Author',
    description: 'This is a test podcast description with detailed information.',
    imageUrl: 'https://example.com/image.jpg',
    category: 'Technology',
    episodes: mockEpisodes,
  };

  const renderPodcastInfo = (podcast: PodcastDetail = mockPodcast) => {
    return render(
      <BrowserRouter>
        <PodcastInfo podcast={podcast} />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should display podcast image', () => {
      renderPodcastInfo();

      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockPodcast.imageUrl);
      expect(image).toHaveAttribute('alt', mockPodcast.title);
      expect(image).toHaveClass('podcast-info__image');
    });

    it('should display podcast title', () => {
      renderPodcastInfo();

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveTextContent(mockPodcast.title);
      expect(title).toHaveClass('podcast-info__title');
    });

    it('should display podcast author with "by" prefix', () => {
      renderPodcastInfo();

      expect(screen.getByText(`by ${mockPodcast.author}`)).toBeInTheDocument();
    });

    it('should display "Description:" subtitle', () => {
      renderPodcastInfo();

      const subtitle = screen.getByRole('heading', { level: 3 });
      expect(subtitle).toHaveTextContent('Description:');
      expect(subtitle).toHaveClass('podcast-info__subtitle');
    });

    it('should display podcast description', () => {
      renderPodcastInfo();

      const description = screen.getByText(mockPodcast.description);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('podcast-info__description');
    });

    it('should render all sections correctly', () => {
      renderPodcastInfo();

      const sections = document.querySelectorAll('.podcast-info__section');
      expect(sections).toHaveLength(2);
    });
  });

  describe('Navigation', () => {
    it('should be clickable anywhere in the component', () => {
      renderPodcastInfo();

      // Click en el título
      const title = screen.getByRole('heading', { level: 2 });
      fireEvent.click(title);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content Display', () => {
    it('should display different podcast data correctly', () => {
      const anotherPodcast: PodcastDetail = {
        id: '999',
        title: 'Another Podcast',
        author: 'Another Author',
        description: 'Another description',
        imageUrl: 'https://example.com/another.jpg',
        category: 'Science',
        episodes: [],
      };

      renderPodcastInfo(anotherPodcast);

      expect(screen.getByText('Another Podcast')).toBeInTheDocument();
      expect(screen.getByText('by Another Author')).toBeInTheDocument();
      expect(screen.getByText('Another description')).toBeInTheDocument();
    });

    it('should display long descriptions correctly', () => {
      const longDescriptionPodcast = {
        ...mockPodcast,
        description: 'A'.repeat(500),
      };

      renderPodcastInfo(longDescriptionPodcast);

      expect(screen.getByText('A'.repeat(500))).toBeInTheDocument();
    });

    it('should handle podcast with empty episodes array', () => {
      const podcastWithoutEpisodes = {
        ...mockPodcast,
        episodes: [],
      };

      renderPodcastInfo(podcastWithoutEpisodes);

      expect(screen.getByText(mockPodcast.title)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      const emptyTitlePodcast = { ...mockPodcast, title: '' };
      renderPodcastInfo(emptyTitlePodcast);

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('');
    });

    it('should handle empty author', () => {
      const emptyAuthorPodcast = { ...mockPodcast, author: '' };
      renderPodcastInfo(emptyAuthorPodcast);

      expect(screen.getByText('by')).toBeInTheDocument();
    });

    it('should handle empty description', () => {
      const emptyDescriptionPodcast = { ...mockPodcast, description: '' };
      renderPodcastInfo(emptyDescriptionPodcast);

      const description = document.querySelector('.podcast-info__description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('');
    });

    it('should handle special characters in title', () => {
      const specialCharPodcast = {
        ...mockPodcast,
        title: 'Test & <Special> "Characters" \'Quotes\'',
      };

      renderPodcastInfo(specialCharPodcast);

      expect(screen.getByText('Test & <Special> "Characters" \'Quotes\'')).toBeInTheDocument();
    });

    it('should handle special characters in author', () => {
      const specialCharPodcast = {
        ...mockPodcast,
        author: 'Author <>&"\'',
      };

      renderPodcastInfo(specialCharPodcast);

      expect(screen.getByText('by Author <>&"\'')).toBeInTheDocument();
    });

    it('should handle special characters in description', () => {
      const specialCharPodcast = {
        ...mockPodcast,
        description: 'Description with <tags> & "quotes" and \'apostrophes\'',
      };

      renderPodcastInfo(specialCharPodcast);

      expect(
        screen.getByText('Description with <tags> & "quotes" and \'apostrophes\'')
      ).toBeInTheDocument();
    });

    it('should handle broken image URL gracefully', () => {
      const brokenImagePodcast = {
        ...mockPodcast,
        imageUrl: 'invalid-url',
      };

      renderPodcastInfo(brokenImagePodcast);

      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image).toHaveAttribute('src', 'invalid-url');
    });
  });

  describe('Memoization', () => {
    it('should not re-render when podcast prop is the same reference', () => {
      const { rerender } = renderPodcastInfo();

      const titleBefore = screen.getByRole('heading', { level: 2 });

      // Rerender with same podcast object
      rerender(
        <BrowserRouter>
          <PodcastInfo podcast={mockPodcast} />
        </BrowserRouter>
      );

      const titleAfter = screen.getByRole('heading', { level: 2 });

      expect(titleBefore).toBe(titleAfter);
    });

    it('should re-render when podcast prop changes', () => {
      const { rerender } = renderPodcastInfo();

      expect(screen.getByText(mockPodcast.title)).toBeInTheDocument();

      const newPodcast: PodcastDetail = {
        ...mockPodcast,
        id: '789',
        title: 'New Podcast Title',
      };

      rerender(
        <BrowserRouter>
          <PodcastInfo podcast={newPodcast} />
        </BrowserRouter>
      );

      expect(screen.getByText('New Podcast Title')).toBeInTheDocument();
      expect(screen.queryByText(mockPodcast.title)).not.toBeInTheDocument();
    });
  });
});
