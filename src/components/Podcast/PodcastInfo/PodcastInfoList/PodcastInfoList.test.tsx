import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EpisodeList } from './PodcastInfoList';
import type { Episode } from '../../../../@types/interfaces/podcast';
import * as commonUtils from '../../../../utils/common';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../../utils/common', () => ({
  formatDate: jest.fn((date: Date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }),
  formatDuration: jest.fn((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }),
}));

describe('EpisodeList', () => {
  const mockEpisodes: Episode[] = [
    {
      id: 'ep1',
      podcastId: '123',
      title: 'Episode 1: Introduction',
      description: 'First episode description',
      audioUrl: 'https://example.com/ep1.mp3',
      duration: 3600, // 1 hour
      releaseDate: new Date('2024-01-01'),
    },
    {
      id: 'ep2',
      podcastId: '123',
      title: 'Episode 2: Deep Dive',
      description: 'Second episode description',
      audioUrl: 'https://example.com/ep2.mp3',
      duration: 2400, // 40 minutes
      releaseDate: new Date('2024-01-08'),
    },
    {
      id: 'ep3',
      podcastId: '123',
      title: 'Episode 3: Conclusion',
      description: 'Third episode description',
      audioUrl: 'https://example.com/ep3.mp3',
      duration: 1800, // 30 minutes
      releaseDate: new Date('2024-01-15'),
    },
  ];

  const renderEpisodeList = (episodes: Episode[] = mockEpisodes, podcastId: string = '123') => {
    return render(
      <BrowserRouter>
        <EpisodeList episodes={episodes} podcastId={podcastId} />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering with Episodes', () => {
    it('should render episode list container', () => {
      renderEpisodeList();

      const container = document.querySelector('.episode-list');
      expect(container).toBeInTheDocument();
    });

    it('should render all episodes', () => {
      renderEpisodeList();

      mockEpisodes.forEach(episode => {
        expect(screen.getByText(episode.title)).toBeInTheDocument();
      });
    });
  });

  describe('Episode Display', () => {
    it('should display episode titles', () => {
      renderEpisodeList();

      expect(screen.getByText('Episode 1: Introduction')).toBeInTheDocument();
      expect(screen.getByText('Episode 2: Deep Dive')).toBeInTheDocument();
      expect(screen.getByText('Episode 3: Conclusion')).toBeInTheDocument();
    });

    it('should call formatDate for each episode', () => {
      const formatDateSpy = jest.spyOn(commonUtils, 'formatDate');
      renderEpisodeList();

      expect(formatDateSpy).toHaveBeenCalledTimes(mockEpisodes.length);
      mockEpisodes.forEach(episode => {
        expect(formatDateSpy).toHaveBeenCalledWith(episode.releaseDate);
      });
    });

    it('should call formatDuration for each episode', () => {
      const formatDurationSpy = jest.spyOn(commonUtils, 'formatDuration');
      renderEpisodeList();

      expect(formatDurationSpy).toHaveBeenCalledTimes(mockEpisodes.length);
      mockEpisodes.forEach(episode => {
        expect(formatDurationSpy).toHaveBeenCalledWith(episode.duration);
      });
    });

    it('should display formatted dates', () => {
      renderEpisodeList();

      expect(screen.getByText('1/1/2024')).toBeInTheDocument();
      expect(screen.getByText('8/1/2024')).toBeInTheDocument();
      expect(screen.getByText('15/1/2024')).toBeInTheDocument();
    });

    it('should display formatted durations', () => {
      renderEpisodeList();

      expect(screen.getByText('01:00:00')).toBeInTheDocument(); // 3600 seconds
      expect(screen.getByText('00:40:00')).toBeInTheDocument(); // 2400 seconds
      expect(screen.getByText('00:30:00')).toBeInTheDocument(); // 1800 seconds
    });
  });

  describe('Memoization', () => {
    it('should not re-render when props are the same reference', () => {
      const { rerender } = renderEpisodeList();

      const headerBefore = screen.getByRole('heading', { level: 2 });
      rerender(
        <BrowserRouter>
          <EpisodeList episodes={mockEpisodes} podcastId="123" />
        </BrowserRouter>
      );

      const headerAfter = screen.getByRole('heading', { level: 2 });

      expect(headerBefore).toBe(headerAfter);
    });

    it('should re-render when episodes change', () => {
      const { rerender } = renderEpisodeList();

      expect(screen.getByText('Episodes: 3')).toBeInTheDocument();

      const newEpisodes = [mockEpisodes[0]];

      rerender(
        <BrowserRouter>
          <EpisodeList episodes={newEpisodes} podcastId="123" />
        </BrowserRouter>
      );

      expect(screen.getByText('Episodes: 1')).toBeInTheDocument();
    });

    it('should re-render when podcastId changes', () => {
      const { rerender } = renderEpisodeList();

      const firstEpisodeRow = screen.getAllByRole('row')[1];
      fireEvent.click(firstEpisodeRow);

      expect(mockNavigate).toHaveBeenCalledWith('/podcast/123/episode/ep1');

      rerender(
        <BrowserRouter>
          <EpisodeList episodes={mockEpisodes} podcastId="456" />
        </BrowserRouter>
      );

      mockNavigate.mockClear();
      fireEvent.click(firstEpisodeRow);

      expect(mockNavigate).toHaveBeenCalledWith('/podcast/456/episode/ep1');
    });
  });

  describe('Integration', () => {
    it('should display all information for each episode', () => {
      renderEpisodeList();

      mockEpisodes.forEach(episode => {
        expect(screen.getByText(episode.title)).toBeInTheDocument();
      });
      expect(screen.getByText('1/1/2024')).toBeInTheDocument();
      expect(screen.getByText('8/1/2024')).toBeInTheDocument();

      expect(screen.getByText('01:00:00')).toBeInTheDocument();
      expect(screen.getByText('00:40:00')).toBeInTheDocument();
    });

    it('should handle transition from empty to filled list', () => {
      const { rerender } = renderEpisodeList([]);

      expect(screen.getByText('No episodes found')).toBeInTheDocument();

      rerender(
        <BrowserRouter>
          <EpisodeList episodes={mockEpisodes} podcastId="123" />
        </BrowserRouter>
      );

      expect(screen.queryByText('No episodes found')).not.toBeInTheDocument();
      expect(screen.getByText('Episodes: 3')).toBeInTheDocument();
    });
  });
});
