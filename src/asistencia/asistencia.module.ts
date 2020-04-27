import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sesion } from 'src/models/Sesion.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Sesion])
  ],
  providers: [AsistenciaService],
  controllers: [AsistenciaController]
})
export class AsistenciaModule {}