import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const dateOfBirth = new Date(createUserDto.dateOfBirth);
    
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        dateOfBirth,
      },
      include: {
        photos: true,
      },
    });
  }

  async findAll(currentUserId: string, filters?: any) {
    return this.prisma.user.findMany({
      where: {
        id: { not: currentUserId },
        isActive: true,
        // Exclure les utilisateurs bloqués
        NOT: {
          blockedUsers: {
            some: { blockerId: currentUserId }
          }
        },
        // Filtres additionnels (âge, localisation, etc.)
        ...filters,
      },
      include: {
        photos: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            receivedLikes: true,
          }
        }
      },
      orderBy: [
        { lastSeen: 'desc' },
        { createdAt: 'desc' }
      ],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        photos: {
          orderBy: { order: 'asc' }
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        photos: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const updateData: any = { ...updateUserDto };
    if (updateUserDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateUserDto.dateOfBirth);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        photos: {
          orderBy: { order: 'asc' }
        },
      },
    });
  }

  async updateLastSeen(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { lastSeen: new Date() },
    });
  }

  async deactivate(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async addPhoto(userId: string, photoUrl: string, isPrimary = false): Promise<void> {
    const photoCount = await this.prisma.photo.count({
      where: { userId }
    });

    await this.prisma.photo.create({
      data: {
        userId,
        url: photoUrl,
        isPrimary: isPrimary || photoCount === 0,
        order: photoCount,
      },
    });
  }

  async removePhoto(userId: string, photoId: string): Promise<void> {
    await this.prisma.photo.deleteMany({
      where: {
        id: photoId,
        userId,
      },
    });
  }

  async getDiscoveryProfiles(currentUserId: string, limit = 10) {
    // Exclure les utilisateurs déjà likés ou matchés
    const likedUserIds = await this.prisma.like.findMany({
      where: { senderId: currentUserId },
      select: { receiverId: true }
    });

    const likedIds = likedUserIds.map(like => like.receiverId);

    return this.prisma.user.findMany({
      where: {
        id: { 
          not: currentUserId,
          notIn: likedIds 
        },
        isActive: true,
        NOT: {
          blockedUsers: {
            some: { blockerId: currentUserId }
          }
        }
      },
      include: {
        photos: {
          orderBy: { order: 'asc' }
        },
      },
      take: limit,
      orderBy: {
        lastSeen: 'desc'
      }
    });
  }
}