import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { Request, Response} from 'express';

@Controller('asistencia')
export class AsistenciaController {
    constructor(
        private readonly asistenciaService: AsistenciaService
    ){}

    @Post()
    async validarAsistencia(@Req() req:Request, @Res() res: Response):Promise<any>{
        const result = await this.asistenciaService.validarAsistencia(req.body);
        console.log(result)
        const response = result['success'] === 1? 
            {
                success: 1,
                message: result['message'],
            }
            :
            {
                success: 0,
                message: 'Asistencia invalida: '+result['message'],
            };
        return res.json(response);
    }
}
