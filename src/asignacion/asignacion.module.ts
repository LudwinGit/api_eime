import { Module } from '@nestjs/common';
import { AsignacionController } from './asignacion.controller';
import { AsignacionService } from './asignacion.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Asignacion } from 'src/models/Asignacion.model';
import { DiplomadoService } from 'src/diplomado/diplomado.service';
import { Diplomado } from 'src/models/Diplomado.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Asignacion,Diplomado])
  ],
  controllers: [AsignacionController],
  providers: [AsignacionService,DiplomadoService]
})
export class AsignacionModule {}
