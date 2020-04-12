import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from 'src/models/Usuario.model';
import { FindEmailDto } from './dto/find-email.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel(Usuario)
        private usuarioModel: typeof Usuario,
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioModel.findAll();
    }

    async findByEmail( findEmailDto : FindEmailDto): Promise<Usuario> {
        return await this.usuarioModel.findOne({ where: { correo: findEmailDto.email } });
    }

    // async login():Promise<Usuario>{
    //     return await this.usuarioModel.findOne({ where: { correo: findEmailDto.email } });
    // }
}