import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig'; // Importa el archivo de configuración

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carga las variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'db'), // Nombre del servicio de la base de datos en docker-compose
        port: configService.get<number>('DB_PORT', 5432), // Puerto de la base de datos del docker-compose.yml
        username: configService.get<string>('POSTGRES_USER'), // Usuario del docker-compose.yml
        password: configService.get<string>('POSTGRES_PASSWORD'), // Contraseña del docker-compose.yml
        database: configService.get<string>('POSTGRES_DB'), // Base de datos del docker-compose.yml
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}