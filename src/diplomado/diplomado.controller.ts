import { Controller, Get, Post, Req, Res, Delete, Query, Put, Param } from '@nestjs/common';
import { DiplomadoService } from './diplomado.service';
import { Request, Response } from 'express';

@Controller('diplomado')
export class DiplomadoController {
    constructor(
        private readonly diplomadoService: DiplomadoService
    ){}

    @Post()
    async findAll():Promise<any[]>{
        return this.diplomadoService.findAll();
    }

    @Post('new')
    async addDiplomado(@Req() req:Request, @Res() res: Response):Promise<any>{
        const result = await this.diplomadoService.addDiplomado(req.body);
        const response = result['success'] === 1? 
            {
                success: 1,
                message: '',
                diplomado: req.body 
            }
            :
            {
                success: 0,
                message: 'Error al crear el diplomado: '+result['message'],
                diplomado: req.body
            };
        return res.json(response);
    }

    @Delete(':id')
    async deleteDiplomado(@Param() param, @Res() res: Response):Promise<any>{
        const result = await this.diplomadoService.deleteDiplomado(param.id);
        const response = result['success'] === 1? 
            {
                success: 1,
                message: '' 
            }
            :
            {
                success: 0,
                message: 'Error al eliminar el diplomado:'+result['message']
            };
        return res.json(response);
    }

    @Put()
    async updateDiplomado(@Req() req:Request, @Res() res: Response):Promise<any>{
        //console.log(req.body);
        const result = await this.diplomadoService.updateDiplomado(req.body);
        const response = result['success'] === 1? 
            {
                success: 1,
                message: '',
                diplomado: req.body 
            }
            :
            {
                success: 0,
                message: 'Error al actualizar diplomado: '+result['message'],
                diplomado: req.body
            };
        return res.json(response);
    }
}
