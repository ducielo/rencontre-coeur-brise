import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async sendLike(senderId: string, receiverId: string) {
    // Vérifier si le like existe déjà
    const existingLike = await this.prisma.like.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId,
        },
      },
    });

    if (existingLike) {
      return { message: 'Like déjà envoyé' };
    }

    // Créer le like
    await this.prisma.like.create({
      data: {
        id: uuidv4(),
        senderId,
        receiverId,
      },
    });

    // Vérifier s'il y a un match (like mutuel)
    const mutualLike = await this.prisma.like.findUnique({
      where: {
        senderId_receiverId: {
          senderId: receiverId,
          receiverId: senderId,
        },
      },
    });

    if (mutualLike) {
      // Créer un match
      const match = await this.prisma.match.create({
        data: {
          id: uuidv4(),
          user1Id: senderId,
          user2Id: receiverId,
        },
        include: {
          user1: {
            include: { photos: true }
          },
          user2: {
            include: { photos: true }
          },
        },
      });

      return {
        isMatch: true,
        match,
        message: 'C\'est un match ! 🎉',
      };
    }

    return {
      isMatch: false,
      message: 'Like envoyé',
    };
  }

  async getUserMatches(userId: string) {
    return this.prisma.match.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId },
        ],
      },
      include: {
        user1: {
          include: {
            photos: {
              where: { isPrimary: true }
            }
          }
        },
        user2: {
          include: {
            photos: {
              where: { isPrimary: true }
            }
          }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserLikes(userId: string) {
    return this.prisma.like.findMany({
      where: { receiverId: userId },
      include: {
        sender: {
          include: {
            photos: {
              where: { isPrimary: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLikeStats(userId: string) {
    const [sentLikes, receivedLikes, matches] = await Promise.all([
      this.prisma.like.count({
        where: { senderId: userId }
      }),
      this.prisma.like.count({
        where: { receiverId: userId }
      }),
      this.prisma.match.count({
        where: {
          OR: [
            { user1Id: userId },
            { user2Id: userId },
          ],
        },
      }),
    ]);

    return {
      sentLikes,
      receivedLikes,
      matches,
    };
  }

  async unmatch(userId: string, matchId: string) {
    const match = await this.prisma.match.findFirst({
      where: {
        id: matchId,
        OR: [
          { user1Id: userId },
          { user2Id: userId },
        ],
      },
    });

    if (!match) {
      throw new Error('Match non trouvé');
    }

    // Supprimer le match et tous les messages associés
    await this.prisma.match.delete({
      where: { id: matchId },
    });

    return { message: 'Match supprimé avec succès' };
  }
}