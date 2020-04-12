import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Usuario } from './models/Usuario.model';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: "postgres",
    host: "138.68.252.228",
    port: 5432,
    username: "postgres",
    password: "eime202003",
    database: "db_eime",
    models:[Usuario]
  }), UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
