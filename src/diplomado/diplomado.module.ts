import { Module } from '@nestjs/common';
import { DiplomadoController } from './diplomado.controller';
import { DiplomadoService } from './diplomado.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Diplomado } from 'src/models/Diplomado.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Diplomado])
  ],
  controllers: [DiplomadoController],
  providers: [DiplomadoService]
})
export class DiplomadoModule {}
