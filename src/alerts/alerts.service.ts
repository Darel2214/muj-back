import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './entities/alert.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert) private alertsRepository: Repository<Alert>,
  ) { }

  async create(createAlertDto: CreateAlertDto) {
    const alert = await this.alertsRepository.save({ ...createAlertDto, status: true });
    return alert;
  }

  async findAll() {
    const alerts = await this.alertsRepository.find({
      join: {
        alias: 'alert',
        leftJoinAndSelect: {
          user: 'alert.user',
        },
      },
    });

    return alerts;
  }

  async findById(id: string) {
    const alerts = await this.alertsRepository.find({
      join: {
        alias: 'alert',
        leftJoinAndSelect: {
          user: 'alert.user',
        }
      },
      where: {
        user: id,
      },
    });

    return alerts;
  }

  async update(id: number, updateAlertDto: UpdateAlertDto) {
    const alert = await this.alertsRepository.update(id, updateAlertDto);

    return alert;
  }

  async findByStatus(status: boolean) {
    const alerts = await this.alertsRepository.find({
      join: {
        alias: 'alert',
        leftJoinAndSelect: {
          user: 'alert.user',
        }
      },
      where: {
        status
      }
    });

    if (!alerts) {
      return [];
    }

    return alerts;
  }
}
