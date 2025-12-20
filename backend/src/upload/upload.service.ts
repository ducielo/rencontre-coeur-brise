import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadPhoto(userId: string, file: Express.Multer.File) {
    // Créer le dossier uploads s'il n'existe pas
    const uploadDir = path.join(process.cwd(), 'uploads', 'photos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const fileName = `${userId}_${Date.now()}${path.extname(file.originalname)}`;
    const filePath = path.join(uploadDir, fileName);

    // Sauvegarder le fichier
    fs.writeFileSync(filePath, file.buffer);

    // URL publique du fichier
    const url = `/uploads/photos/${fileName}`;

    // Obtenir le nombre de photos de l'utilisateur pour définir l'ordre
    const photoCount = await this.prisma.photo.count({
      where: { userId },
    });

    // Enregistrer dans la base de données
    return this.prisma.photo.create({
      data: {
        url,
        userId,
        isPrimary: photoCount === 0, // Première photo = photo principale
        order: photoCount,
      },
    });
  }

  async deletePhoto(photoId: string, userId: string) {
    const photo = await this.prisma.photo.findFirst({
      where: {
        id: photoId,
        userId,
      },
    });

    if (!photo) {
      throw new Error('Photo non trouvée');
    }

    // Supprimer le fichier
    const filePath = path.join(process.cwd(), photo.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Supprimer de la base de données
    return this.prisma.photo.delete({
      where: { id: photoId },
    });
  }

  async setPrimaryPhoto(photoId: string, userId: string) {
    // Retirer le statut primary de toutes les photos
    await this.prisma.photo.updateMany({
      where: { userId },
      data: { isPrimary: false },
    });

    // Définir la nouvelle photo principale
    return this.prisma.photo.update({
      where: { id: photoId },
      data: { isPrimary: true },
    });
  }
}
