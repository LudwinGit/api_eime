import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from "@nestjs/sequelize";

import { UsuarioModule } from './usuario/usuario.module';
import { RoleModule } from './role/role.module';
import { CatedraticoModule } from './catedratico/catedratico.module';
import { DiplomadoModule } from './diplomado/diplomado.module';
import { AsignacionModule } from './asignacion/asignacion.module';
import { SesionModule } from './sesion/sesion.module';

import { Usuario } from './models/Usuario.model';
import { Password } from './models/Password.model';
import { Rol } from './models/Rol.model';
import { Curso } from './models/Curso.model';
import { Asignacion } from './models/Asignacion.model';
import { Sesion } from './models/Sesion.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "138.68.252.228",
      port: 5432,
      username: "postgres",
      password: "eime202003",
      database: "db_eime",
      models:[
        Usuario,
        Password,
        Rol,
        Curso,
        Asignacion,
        Sesion]
    }), 
    UsuarioModule, 
    RoleModule, 
    CatedraticoModule, 
    DiplomadoModule, AsignacionModule, SesionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
