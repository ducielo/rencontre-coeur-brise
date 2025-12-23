import { IsEmail, IsString, MinLength, IsDateString, IsIn, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  password: string;

  @IsString({ message: 'Le prénom est requis' })
  firstName: string;

  @IsString({ message: 'Le nom est requis' })
  lastName: string;

  @IsDateString({}, { message: 'Date de naissance invalide' })
  dateOfBirth: string;

  @IsIn(['MALE', 'FEMALE', 'OTHER'], { message: 'Genre invalide' })
  gender: string;

  @IsString({ message: 'La localisation est requise' })
  location: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  job?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  interests?: string;
}