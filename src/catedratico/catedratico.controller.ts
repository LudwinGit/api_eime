import { Controller, Get, Post, Res, Req, Delete, Query, Put, Param } from '@nestjs/common';
import { CatedraticoService } from './catedratico.service';
import { Request, Response} from 'express';

@Controller('catedratico')
export class CatedraticoController {
    constructor(
        private readonly catedraticoService: CatedraticoService
    ){}

    @Get()
    async findAll():Promise<any[]>{
        return await this.catedraticoService.findAll();
    }

    @Post()
    async addCatedratico(@Req() req:Request, @Res() res: Response):Promise<any>{
        const result = await this.catedraticoService.addCatedratico(req.body);
        const response = result === 1? 
            {
                success: 1,
                message: '',
                catedratico: req.body 
            }
            :
            {
                success: 0,
                message: 'Error al crear el catedratico, correo y cui deben ser estar ya asociados a una cuenta',
                catedratico: req.body
            };
        return res.json(response);
    }

    @Delete(':id')
    async deleteCatedratico(@Param() param, @Res() res: Response):Promise<any>{
        const result = await this.catedraticoService.deleteCatedratico(param.id);
        const response = result === 1? 
            {
                success: 1,
                message: '' 
            }
            :
            {
                success: 0,
                message: 'Error al eliminar el catedratico, registro inexistente'
            };
        return res.json(response);
    }

    @Put()
    async updateCatedratico(@Req() req:Request, @Res() res: Response):Promise<any>{
        //console.log(req.body);
        const result = await this.catedraticoService.updateCatedratico(req.body);
        const response = result === 1? 
            {
                success: 1,
                message: '',
                catedratico: req.body 
            }
            :
            {
                success: 0,
                message: 'Error al actualizar catedratico',
                catedratico: req.body
            };
        return res.json(response);
    }
}