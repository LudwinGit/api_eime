import { Controller, Get, Param, Post, Body, Req, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/models/Usuario.model';
import { FindEmailDto } from "./dto/find-email.dto";
import { LoginDto } from "./dto/login.dto";
import { Response } from 'express';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }
    @Get()
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioService.findAll();
    }

    @Post('/checkEmail')
    async findEmail(@Res() res: Response, @Body() findEmailDto: FindEmailDto): Promise<any> {

        const usuario = await this.usuarioService.findByEmail(findEmailDto);

        const success = (usuario === null) ? 0 : 1;
        const message = (usuario === null) ? "El correo no esta registrado." : "";
        const id = (usuario === null) ? null : usuario.id_usuario;

        const response = {
            success,
            message,
            id
        }
        return res.json(response);
    }

    // @Post('/login')
    // async login(@Res() res: Response, @Body() loginDto: LoginDto): Promise<any> {

    // }
}

