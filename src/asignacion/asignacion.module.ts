import { Module } from '@nestjs/common';
import { AsignacionController } from './asignacion.controller';
import { AsignacionService } from './asignacion.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Asignacion } from 'src/models/Asignacion.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Asignacion])
  ],
  controllers: [AsignacionController],
  providers: [AsignacionService]
})
export class AsignacionModule {}
