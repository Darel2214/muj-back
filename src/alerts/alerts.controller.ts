import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) { }

  @Post()
  async create(@Body() createAlertDto: CreateAlertDto) {
    return await this.alertsService.create(createAlertDto);
  }

  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return await this.alertsService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('byStatus/:status')
  async findByStatus(@Param('status') status: boolean) {
    return await this.alertsService.findByStatus(status);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('byId/:id')
  async getById(@Param('id') id: string) {
    return await this.alertsService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAlertDto: UpdateAlertDto,
  ) {
    return await this.alertsService.update(+id, updateAlertDto);
  }
}
