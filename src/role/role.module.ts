import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Rol } from 'src/models/Rol.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Rol])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
