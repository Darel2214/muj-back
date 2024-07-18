import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/services/auth/auth/auth.service';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:
        process.env.DB_URL_CONNECTION ||
        'postgresql://postgres:30082000@localhost:5432/mujersegura?schema=public',
      autoLoadEntities: true,
      synchronize: true,
      extra: {

      },
    }),
    AuthModule,
    UsersModule,
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}

// forRootAsync({
//   useFactory: async () =>
//     Object.assign(await getConnectionOptions(), { autoLoadEntities: true }),
// }
