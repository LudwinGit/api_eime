import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from 'src/models/Usuario.model';
import { FindEmailDto } from './dto/find-email.dto';
import { LoginDto } from './dto/login.dto';
import { Password } from 'src/models/Password.model';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel(Usuario)
        private usuarioModel: typeof Usuario,
        @InjectModel(Password)
        private passwordModel: typeof Password,
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioModel.findAll();
    }

    async findByEmail(findEmailDto: FindEmailDto): Promise<Usuario> {
        return await this.usuarioModel.findOne({ where: { correo: findEmailDto.email } });
    }

    async login(loginDto: LoginDto): Promise<Usuario> {
        const password = await this.passwordModel.findOne({
            where:
                { pwd: loginDto.password, id_usuario: loginDto.id }
        });

        return (password == null) ? null :
            await this.usuarioModel.findOne({ where: { id_usuario: loginDto.id } });
    }
}