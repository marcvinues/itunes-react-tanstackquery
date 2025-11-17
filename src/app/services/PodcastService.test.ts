import { PodcastService } from './PodCastService';
import { PodcastApiService } from './api/PodcastApiService';
import type { Podcast, PodcastDetail, Episode } from '../../@types/interfaces/podcast';

describe('PodcastService', () => {
  let podcastService: PodcastService;
  let mockApiService: jest.Mocked<PodcastApiService>;

  const mockPodcasts: Podcast[] = [
    {
      id: '1',
      title: 'JavaScript Weekly',
      author: 'John Doe',
      description: 'Weekly JavaScript podcast',
      imageUrl: 'https://example.com/js.jpg',
      category: 'Technology',
    },
    {
      id: '2',
      title: 'TypeScript Deep Dive',
      author: 'Jane Smith',
      description: 'Deep dive into TypeScript',
      imageUrl: 'https://example.com/ts.jpg',
      category: 'Technology',
    },
    {
      id: '3',
      title: 'React Masterclass',
      author: 'John Doe',
      description: 'Master React development',
      imageUrl: 'https://example.com/react.jpg',
      category: 'Technology',
    },
  ];

  const mockEpisodes: Episode[] = [
    {
      id: 'ep1',
      podcastId: '1',
      title: 'Introduction to Variables',
      description: 'Learn about variables',
      audioUrl: 'https://example.com/ep1.mp3',
      duration: 1800,
      releaseDate: new Date('2024-01-01'),
    },
    {
      id: 'ep2',
      podcastId: '1',
      title: 'Functions and Scope',
      description: 'Understanding functions',
      audioUrl: 'https://example.com/ep2.mp3',
      duration: 2400,
      releaseDate: new Date('2024-01-08'),
    },
    {
      id: 'ep3',
      podcastId: '1',
      title: 'Async Programming',
      description: 'Mastering async code',
      audioUrl: 'https://example.com/ep3.mp3',
      duration: 3000,
      releaseDate: new Date('2024-01-15'),
    },
  ];

  const mockPodcastDetail: PodcastDetail = {
    ...mockPodcasts[0],
    episodes: mockEpisodes,
  };

  beforeEach(() => {
    mockApiService = {
      fetchTopPodcasts: jest.fn(),
      fetchPodcastById: jest.fn(),
    } as never;
    podcastService = new PodcastService(mockApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should create instance with apiService', () => {
      expect(podcastService).toBeInstanceOf(PodcastService);
      expect(podcastService).toBeDefined();
    });
  });

  describe('getAllPodcasts', () => {
    it('should return all podcasts from apiService', async () => {
      mockApiService.fetchTopPodcasts.mockResolvedValue(mockPodcasts);

      const result = await podcastService.getAllPodcasts();

      expect(result).toEqual(mockPodcasts);
      expect(result).toHaveLength(3);
    });

    it('should propagate errors from apiService', async () => {
      const error = new Error('Network error');
      mockApiService.fetchTopPodcasts.mockRejectedValue(error);

      await expect(podcastService.getAllPodcasts()).rejects.toThrow('Network error');
    });
  });

  describe('searchPodcasts', () => {
    it('should return all podcasts when query is empty', () => {
      const result = podcastService.searchPodcasts(mockPodcasts, '');

      expect(result).toEqual(mockPodcasts);
      expect(result).toHaveLength(3);
    });

    it('should return all podcasts when query is whitespace', () => {
      const result = podcastService.searchPodcasts(mockPodcasts, '   ');

      expect(result).toEqual(mockPodcasts);
    });

    it('should filter podcasts by title', () => {
      const result = podcastService.searchPodcasts(mockPodcasts, 'JavaScript');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('JavaScript Weekly');
    });
  });

  describe('getPodcastById', () => {
    it('should return podcast detail from apiService', async () => {
      mockApiService.fetchPodcastById.mockResolvedValue(mockPodcastDetail);

      const result = await podcastService.getPodcastById('1');

      expect(result).toEqual(mockPodcastDetail);
      expect(result.episodes).toHaveLength(3);
    });
  });

  describe('searchEpisodes', () => {
    it('should return all episodes when query is empty', () => {
      const result = podcastService.searchEpisodes(mockEpisodes, '');

      expect(result).toEqual(mockEpisodes);
      expect(result).toHaveLength(3);
    });

    it('should return all episodes when query is whitespace', () => {
      const result = podcastService.searchEpisodes(mockEpisodes, '   ');

      expect(result).toEqual(mockEpisodes);
    });

    it('should filter episodes by title', () => {
      const result = podcastService.searchEpisodes(mockEpisodes, 'Variables');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Introduction to Variables');
    });
  });

  describe('getEpisode', () => {
    it('should call getPodcastById with correct podcastId', async () => {
      mockApiService.fetchPodcastById.mockResolvedValue(mockPodcastDetail);

      await podcastService.getEpisode('1', 'ep1');

      expect(mockApiService.fetchPodcastById).toHaveBeenCalledWith('1');
    });

    describe('Integration', () => {
      it('should work with real-world workflow: search then get detail', async () => {
        mockApiService.fetchTopPodcasts.mockResolvedValue(mockPodcasts);
        mockApiService.fetchPodcastById.mockResolvedValue(mockPodcastDetail);

        const allPodcasts = await podcastService.getAllPodcasts();

        const searchResults = podcastService.searchPodcasts(allPodcasts, 'JavaScript');

        const podcastDetail = await podcastService.getPodcastById(searchResults[0].id);

        expect(podcastDetail.episodes).toBeDefined();
        expect(podcastDetail.episodes.length).toBeGreaterThan(0);
      });

      it('should work with episode search workflow', async () => {
        mockApiService.fetchPodcastById.mockResolvedValue(mockPodcastDetail);

        const podcast = await podcastService.getPodcastById('1');

        const searchResults = podcastService.searchEpisodes(podcast.episodes, 'Functions');

        const episode = await podcastService.getEpisode('1', searchResults[0].id);

        expect(episode.title).toBe('Functions and Scope');
      });
    });
  });
});
