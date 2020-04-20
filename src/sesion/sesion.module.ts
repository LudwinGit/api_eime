import { Module } from '@nestjs/common';
import { SesionController } from './sesion.controller';
import { SesionService } from './sesion.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sesion } from 'src/models/Sesion.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Sesion])
  ],
  controllers: [SesionController],
  providers: [SesionService]
})
export class SesionModule {}
