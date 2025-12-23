import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  // Envoyer une notification push (simulation)
  async sendPushNotification(userId: string, title: string, message: string) {
    // En production, utiliser Firebase Cloud Messaging ou un service similaire
    console.log(`📱 Notification pour ${userId}: ${title} - ${message}`);
    
    // Log la notification en base pour tracking
    // Vous pouvez créer une table notifications si nécessaire
    return {
      userId,
      title,
      message,
      sentAt: new Date(),
      type: 'push'
    };
  }

  // Notifier un nouveau match
  async notifyNewMatch(user1Id: string, user2Id: string) {
    const [user1, user2] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: user1Id } }),
      this.prisma.user.findUnique({ where: { id: user2Id } }),
    ]);

    if (user1 && user2) {
      await Promise.all([
        this.sendPushNotification(
          user1Id,
          'Nouveau match ! 💕',
          `Vous avez un nouveau match avec ${user2.firstName}`
        ),
        this.sendPushNotification(
          user2Id,
          'Nouveau match ! 💕',
          `Vous avez un nouveau match avec ${user1.firstName}`
        ),
      ]);
    }
  }

  // Notifier un nouveau message
  async notifyNewMessage(senderId: string, receiverId: string, message: string) {
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      select: { firstName: true }
    });

    if (sender) {
      await this.sendPushNotification(
        receiverId,
        `Message de ${sender.firstName}`,
        message
      );
    }
  }

  // Notifier un nouveau like
  async notifyNewLike(senderId: string, receiverId: string) {
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      select: { firstName: true }
    });

    if (sender) {
      await this.sendPushNotification(
        receiverId,
        'Quelqu\'un vous aime ! ❤️',
        `${sender.firstName} vous a envoyé un like`
      );
    }
  }

  // Tâche CRON: Notifications de rappel quotidien
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async sendDailyReminders() {
    console.log('🔔 Envoi des rappels quotidiens...');
    
    // Trouver les utilisateurs inactifs depuis plus de 24h
    const inactiveUsers = await this.prisma.user.findMany({
      where: {
        isActive: true,
        lastSeen: {
          lt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24h ago
        }
      },
      select: { id: true, firstName: true }
    });

    for (const user of inactiveUsers) {
      await this.sendPushNotification(
        user.id,
        'Des nouvelles personnes vous attendent ! 💖',
        `Bonjour ${user.firstName}, découvrez de nouveaux profils aujourd'hui`
      );
    }

    console.log(`✅ ${inactiveUsers.length} rappels envoyés`);
  }

  // Tâche CRON: Nettoyage des anciennes données (chaque dimanche à 2h)
  @Cron('0 2 * * 0')
  async cleanupOldData() {
    console.log('🧹 Nettoyage des anciennes données...');
    
    // Supprimer les messages de plus de 6 mois
    const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
    
    const deletedMessages = await this.prisma.message.deleteMany({
      where: {
        createdAt: { lt: sixMonthsAgo }
      }
    });

    console.log(`✅ ${deletedMessages.count} anciens messages supprimés`);
  }

  // Tâche CRON: Mise à jour du statut des utilisateurs inactifs
  @Cron(CronExpression.EVERY_HOUR)
  async updateUserStatus() {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    // Désactiver les comptes inactifs depuis plus d'une semaine
    const updatedUsers = await this.prisma.user.updateMany({
      where: {
        isActive: true,
        lastSeen: { lt: oneWeekAgo }
      },
      data: { isActive: false }
    });

    if (updatedUsers.count > 0) {
      console.log(`⏰ ${updatedUsers.count} comptes désactivés pour inactivité`);
    }
  }

  // Statistiques temps réel pour monitoring
  async getNotificationStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [newUsers, newMatches, newMessages] = await Promise.all([
      this.prisma.user.count({
        where: { createdAt: { gte: today } }
      }),
      this.prisma.match.count({
        where: { createdAt: { gte: today } }
      }),
      this.prisma.message.count({
        where: { createdAt: { gte: today } }
      }),
    ]);

    return {
      todayStats: {
        newUsers,
        newMatches,
        newMessages,
      },
      lastUpdated: new Date()
    };
  }
}