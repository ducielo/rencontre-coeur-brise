import {
  Controller,
  Post,
  Delete,
  Patch,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadPhoto(req.user.userId, file);
  }

  @Delete('photo/:photoId')
  async deletePhoto(@Request() req, @Param('photoId') photoId: string) {
    return this.uploadService.deletePhoto(photoId, req.user.userId);
  }

  @Patch('photo/:photoId/primary')
  async setPrimaryPhoto(@Request() req, @Param('photoId') photoId: string) {
    return this.uploadService.setPrimaryPhoto(photoId, req.user.userId);
  }
}
