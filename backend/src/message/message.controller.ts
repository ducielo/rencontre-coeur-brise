import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async sendMessage(
    @Request() req,
    @Body() body: { receiverId: string; content: string; matchId?: string },
  ) {
    return this.messageService.sendMessage(
      req.user.userId,
      body.receiverId,
      body.content,
      body.matchId,
    );
  }

  @Get('conversation/:otherUserId')
  async getConversation(@Request() req, @Param('otherUserId') otherUserId: string) {
    return this.messageService.getConversation(req.user.userId, otherUserId);
  }

  @Post(':messageId/read')
  async markAsRead(@Request() req, @Param('messageId') messageId: string) {
    return this.messageService.markAsRead(messageId, req.user.userId);
  }

  @Get('unread-count')
  async getUnreadCount(@Request() req) {
    return this.messageService.getUnreadCount(req.user.userId);
  }
}
