import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: true, // Em produção, defina como false e use migrations
});
