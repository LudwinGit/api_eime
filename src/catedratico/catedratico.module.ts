import { Module } from '@nestjs/common';
import { CatedraticoController } from './catedratico.controller';
import { CatedraticoService } from './catedratico.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from 'src/models/Usuario.model';
import { Password } from 'src/models/Password.model';
import { Rol } from 'src/models/Rol.model';
import { RoleService } from 'src/role/role.service';
import { Curso } from 'src/models/Curso.model';
import { Sesion } from 'src/models/Sesion.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Usuario,Password,Rol,Curso,Sesion])
  ],
  controllers: [CatedraticoController],
  providers: [CatedraticoService,RoleService]
})
export class CatedraticoModule {}
