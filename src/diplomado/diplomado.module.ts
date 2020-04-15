import { Module } from '@nestjs/common';
import { DiplomadoController } from './diplomado.controller';
import { DiplomadoService } from './diplomado.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Curso } from 'src/models/Curso.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Curso])
  ],
  controllers: [DiplomadoController],
  providers: [DiplomadoService]
})
export class DiplomadoModule {}
