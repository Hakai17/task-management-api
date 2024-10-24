// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/database.config'; // Arquivo de configuração do banco de dados
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // As configurações estarão disponíveis globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig, // Função que retorna a configuração do TypeORM
    }),
    AuthModule, // Módulo de autenticação
    TasksModule, // Módulo de gerenciamento de tarefas
    UsersModule, // Módulo de gerenciamento de usuários
  ],
  controllers: [], // Os controladores são definidos nos respectivos módulos
  providers: [], // Os serviços são definidos nos respectivos módulos
})
export class AppModule {}
