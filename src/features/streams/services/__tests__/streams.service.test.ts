import { StreamsService } from '../streams.service';
import { prismaClient } from '@/src/lib';
import { BusinessLogicError, NotFoundError } from '@/src/lib/api/errors/customErrors';
import { ErrorCode } from '@/src/lib/api/errorConstants';

// Mock Prisma client
jest.mock('@/src/lib', () => ({
  prismaClient: {
    stream: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  },
}));

// Mock get-youtube-id
jest.mock('get-youtube-id', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import getYouTubeId from 'get-youtube-id';

describe('StreamsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createStream', () => {
    it('should create a stream with valid YouTube URL', async () => {
      const mockUserId = 'user-123';
      const mockUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      const mockVideoId = 'dQw4w9WgXcQ';

      (getYouTubeId as jest.Mock).mockReturnValue(mockVideoId);
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValue({ id: mockUserId });
      (prismaClient.stream.create as jest.Mock).mockResolvedValue({
        id: 'stream-123',
        UserId: mockUserId,
        url: mockUrl,
        extractedId: mockVideoId,
        type: 'Youtube',
      });

      const result = await StreamsService.createStream({
        creatorId: mockUserId,
        url: mockUrl,
      });

      expect(result).toBeDefined();
      expect(prismaClient.stream.create).toHaveBeenCalledWith({
        data: {
          UserId: mockUserId,
          url: mockUrl,
          extractedId: mockVideoId,
          type: 'Youtube',
        },
      });
    });

    it('should throw error if YouTube ID extraction fails', async () => {
      const mockUserId = 'user-123';
      const mockUrl = 'https://invalid-url.com';

      (getYouTubeId as jest.Mock).mockReturnValue(null);

      await expect(
        StreamsService.createStream({
          creatorId: mockUserId,
          url: mockUrl,
        })
      ).rejects.toThrow(BusinessLogicError);
    });

    it('should throw error if user not found', async () => {
      const mockUserId = 'user-123';
      const mockUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      const mockVideoId = 'dQw4w9WgXcQ';

      (getYouTubeId as jest.Mock).mockReturnValue(mockVideoId);
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        StreamsService.createStream({
          creatorId: mockUserId,
          url: mockUrl,
        })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('getStreams', () => {
    it('should return streams sorted by most upvoted', async () => {
      const mockStreams = [
        {
          id: 'stream-1',
          upvotes: [{ id: 'upvote-1' }, { id: 'upvote-2' }],
          user: { id: 'user-1', email: 'user1@example.com' },
        },
        {
          id: 'stream-2',
          upvotes: [{ id: 'upvote-3' }],
          user: { id: 'user-2', email: 'user2@example.com' },
        },
      ];

      (prismaClient.stream.findMany as jest.Mock).mockResolvedValue(mockStreams);

      const result = await StreamsService.getStreams('mostUpvoted');

      expect(result.streams).toHaveLength(2);
      expect(result.streams[0].upvoteCount).toBe(2);
      expect(result.streams[1].upvoteCount).toBe(1);
    });
  });
});
