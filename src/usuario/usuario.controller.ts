import { Controller, Get, Param, Post, Body, Req, Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/models/Usuario.model';
import { FindEmailDto } from "./dto/find-email.dto";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/create.dto";
import { Response, response } from 'express';
import { RoleService } from 'src/role/role.service';
import { AsignacionService } from 'src/asignacion/asignacion.service';
import { Password } from 'src/models/Password.model';
import { async } from 'rxjs/internal/scheduler/async';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly rolService: RoleService,
        private readonly asignacionService: AsignacionService
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

    @Get('/cursos/:id')
    async cursos(@Res() res: Response, @Param() params): Promise<any> {
        const usuario = await this.usuarioService.findById(params.id);
        if (usuario == null)
            return res.json({ "cursos": [], "message": "El usuario no existe" })

        const cursos = await this.asignacionService.cursosUsuario(params.id);
        return res.json({ cursos });
    }

    @Get('/asignacion/:id')
    async asignacion(@Res() res: Response, @Param() params): Promise<any> {
        const usuario = await this.usuarioService.findById(params.id);
        if (usuario == null)
            return res.json({ "cursos": [], "message": "El usuario no existe" })

        const cursos = await this.asignacionService.asignacionesUsuario(params.id);
        return res.json({ cursos });
    }

    @Post('register')
    async registrar(@Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<any> {
        let response;
        if (await this.usuarioService.create(createUserDto)) {
            response = {
                success: 1,
                message: ""
            }
        } else {
            response = {
                success: 0,
                message: "No se pudo crear el usuario."
            }
        }
        return res.json({ response });
    }

    @Get(':id')
    async find(@Res() res: Response, @Param() params): Promise<any> {
        let usuario: Usuario = await this.usuarioService.findById(params.id);
        let response;
        if (usuario === null) {
            response = {
                success: 0,
                message: "El usuario no esta registrado",
                user_data: null
            }
        } else {
            response = {
                success: 1,
                message: "",
                user_data: usuario
            }
        }

        return res.json({ response });
    }

    @Post('change_password')
    async change_password(@Res() res: Response, @Body() changePasswordDto: ChangePasswordDto): Promise<any> {
        console.log("aca",changePasswordDto);
        
        if (await this.usuarioService.changePassword(changePasswordDto)) {
            return res.json({
                success: 1,
                message: "¡Su contrasena se cambio correctamente!"
            })
        }
        return res.json({
            success: 0,
            message: ""
        })
    }
}

