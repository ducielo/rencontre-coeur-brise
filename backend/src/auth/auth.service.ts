import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Vérifier si l'email existe déjà
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    // Créer l'utilisateur
    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Générer le token JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        location: user.location,
        isVerified: user.isVerified,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // Mettre à jour la dernière connexion
    await this.userService.updateLastSeen(user.id);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        location: user.location,
        job: user.job,
        education: user.education,
        bio: user.bio,
        interests: user.interests,
        isVerified: user.isVerified,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async validateUserById(userId: string): Promise<User | null> {
    return this.userService.findById(userId);
  }
}