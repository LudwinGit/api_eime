import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SesionService } from './sesion.service';
import { Request, Response} from 'express';

@Controller('sesion')
export class SesionController {
    constructor(
        private readonly sesionService: SesionService
    ){}

    //@Get()
    //async findAll():Promise<any[]>{
    //    return await this.sesionService.findAll();
    //}

    @Post()
    async addSesion(@Req() req:Request, @Res() res: Response):Promise<any>{
        const result = await this.sesionService.addSesion(req.body);
        const response = result['success'] === 1? 
            {
                success: 1,
                message: '',
                codigo: result['code']
            }
            :
            {
                success: 0,
                message: 'Error al crear la sesion: '+result['message'],
                codigo: null
            };
        return res.json(response);
    }
}
