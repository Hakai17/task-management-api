// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Importar o módulo de usuários
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Para tornar as variáveis de ambiente disponíveis em toda a aplicação
    }),
    UsersModule, // Garantir que o UsersModule esteja aqui
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Defina uma chave secreta segura
      signOptions: { expiresIn: '360m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
