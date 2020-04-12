import { Controller, Get, Param, Post, Body, Req, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/models/Usuario.model';
import { FindEmailDto } from "./dto/find-email.dto";
import { LoginDto } from "./dto/login.dto";
import { Response, response } from 'express';
import { RoleService } from 'src/role/role.service';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly rolService: RoleService
    ) { }
    @Get()
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioService.findAll();
    }

    @Post('/checkEmail')
    async findEmail(@Res() res: Response, @Body() findEmailDto: FindEmailDto): Promise<any> {

        const usuario = await this.usuarioService.findByEmail(findEmailDto);
        const response = (usuario === null) ?
            {
                success: 0,
                message: "El correo no esta registrado.",
                id: null
            }
            :
            {
                success: 1,
                message: "",
                id: usuario.id_usuario,
            };

        return res.json(response);
    }

    @Post('/login')
    async login(@Res() res: Response, @Body() loginDto: LoginDto): Promise<any> {
        const usuario = await this.usuarioService.login(loginDto);
        const role = (usuario == null) ? null : await this.rolService.findOne(usuario.id_rol);

        const response = (usuario === null) ?
            {
                success: 0,
                message: "La constraseña no es correcta.",
                user: null
            }
            :
            {
                success: 1,
                message: "",
                user: {
                    id_rol: usuario.id_rol,
                    role: role.nombre,
                    photo: usuario.foto,
                    nombre: usuario.nombre
                }
            };
        return res.json(response);
    }
}

