import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from 'src/models/Usuario.model';

@Module({
    imports: [SequelizeModule.forFeature([Usuario])],
    controllers: [UsuarioController],
    providers: [UsuarioService]
})
export class UsuarioModule { }
