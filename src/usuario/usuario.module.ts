import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from 'src/models/Usuario.model';
import { Password } from 'src/models/Password.model';
import { Rol } from 'src/models/Rol.model';
import { RoleService } from 'src/role/role.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Usuario, Password,Rol])
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService,RoleService]
})
export class UsuarioModule { }
