import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from 'src/models/Usuario.model';
import { FindEmailDto } from './dto/find-email.dto';
import { LoginDto } from './dto/login.dto';
import { Password } from 'src/models/Password.model';
import { CreateUserDto } from './dto/create.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Sequelize } from 'sequelize';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel(Usuario)
        private usuarioModel: typeof Usuario,
        @InjectModel(Password)
        private passwordModel: typeof Password,
        private sequelize: Sequelize
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioModel.findAll();
    }

    async findById(id: number): Promise<Usuario> {
        return await this.usuarioModel.findOne({ where: { id_usuario: id } });
    }

    async findByEmail(findEmailDto: FindEmailDto): Promise<Usuario> {
        return await this.usuarioModel.findOne({ where: { correo: findEmailDto.email, debaja: '0' } });
    }

    async login(loginDto: LoginDto): Promise<Usuario> {
        const password = await this.passwordModel.findOne({
            where:
                { pwd: loginDto.password, id_usuario: loginDto.id }
        });

        return (password == null) ? null :
            await this.usuarioModel.findOne({ where: { id_usuario: loginDto.id } });
    }

    async create(createUserDto: CreateUserDto): Promise<boolean> {

        let user: Usuario = await this.usuarioModel.findOne({ where: { correo: createUserDto.correo } });

        if (user === null)
            user = await this.usuarioModel.findOne({ where: { carne: createUserDto.carnet } });
        if (user === null)
            user = await this.usuarioModel.findOne({ where: { nombre: createUserDto.nombre } });

        if (user !== null)
            return false;
        let usuario: Usuario = new Usuario();

        usuario.carne = createUserDto.carnet;
        usuario.nombre = createUserDto.nombre + createUserDto.apellidos;
        usuario.correo = createUserDto.correo;
        usuario.telefono = createUserDto.telefono;
        usuario.direccion = createUserDto.direccion;
        usuario.dpi = createUserDto.cui;
        usuario.foto = createUserDto.picture;
        usuario.id_rol = 3;
        usuario.debaja = '0';

        await usuario.save();

        let password: Password = new Password();
        let date = new Date();
        password.pwd = createUserDto.password;
        password.fecha_hora = date;
        password.id_usuario = usuario.id_usuario;
        password.active = '1';
        await password.save();

        return true;
    }

    async changePassword(changePasswordDto: ChangePasswordDto): Promise<Boolean> {

        let password: Password = await this.passwordModel.findOne({
            where: {
                pwd: changePasswordDto.password,
                active: '1',
                id_usuario: changePasswordDto.id,
            }
        });

        if (password === null)
            return false;

        await this.passwordModel.update({
            pwd: changePasswordDto.newPassword
        }, { where: { id_password: password.id_password } });

        return true;
    }

    async asistencia(id_usuario: number, id_diplomado: number): Promise<any> {
        try {
            const result = await this.sequelize
                .query(`select * from asistencia a 
                join sesion b on b.id_sesion = a.id_sesion
                where b.id_diplomado = ${id_diplomado} and a.id_usuario = ${id_usuario}`);
            return result[0];
        } catch (err) {
            console.log(err)
            return null;
        }
    }

    async validarPassword(loginDto: LoginDto): Promise<Password> {
        
        let password: Password = await this.passwordModel.findOne({
            where: {
                pwd: loginDto.password,
                active: '1',
                id_usuario: loginDto.id,
            }
        });
        if (password === null)
            return null;

        return password;
    }
}