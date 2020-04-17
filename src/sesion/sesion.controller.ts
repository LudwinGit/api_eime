import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SesionService } from './sesion.service';
import { Request, Response} from 'express';

@Controller('sesion')
export class SesionController {
    constructor(
        private readonly sesionService: SesionService
    ){}

    @Get()
    async findAll():Promise<any[]>{
        return await this.sesionService.findAll();
    }

    @Post()
    async addCatedratico(@Req() req:Request, @Res() res: Response):Promise<any>{
        /*const result = await this.sesionService.addSesion(req.body);
        const response = result === 1? 
            {
                success: 1,
                message: '',
                catedratico: req.body 
            }
            :
            {
                success: 0,
                message: 'Error al crear la sesion, ya hay una sesion en la fecha estipulada',
                catedratico: req.body
            };
        return res.json(response);*/
        return res.json({mensaje:'Hola post sesiones'});
    }
}
