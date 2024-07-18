import { Alert } from './entities/alert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  controllers: [AlertsController],
  providers: [AlertsService],
  exports: [TypeOrmModule, AlertsService],
})
export class AlertsModule {}
