import { Controller, Get, Post, Res, Req, Delete, Query, Put, Param } from '@nestjs/common';
import { CatedraticoService } from './catedratico.service';
import { Request, Response} from 'express';
import { identity } from 'rxjs';

@Controller('catedratico')
export class CatedraticoController {
    constructor(
        private readonly catedraticoService: CatedraticoService
    ){}

    @Post()
    async findAll():Promise<any[]>{
        return await this.catedraticoService.findAll();
    }

    @Post(':id/diplomados')
    async findCourses(@Param('id')id:string):Promise<any[]>{
       return await this.catedraticoService.findCourses(id)
    }

    @Post('new')
    async addCatedratico(@Req() req:Request, @Res() res: Response):Promise<any>{
        const result = await this.catedraticoService.addCatedratico(req.body);
        const response = result['success'] === 1? 
            {
                success: 1,
                message: '',
                catedratico: req.body 
            }
            :
            {
                success: 0,
                message: 'Error al crear el catedratico, correo y cui deben ser estar ya asociados a una cuenta: '+result['message'],
                catedratico: req.body
            };
        return res.json(response);
    }

    @Delete('/diplomado')
    async deleteCatedraticoDiplomado(@Req() req:Request, @Res() res: Response):Promise<any>{
        console.log('Dar de baja diplomado')
        const result = await this.catedraticoService.deleteCatedraticoDiplomado(req.body);
        const response = result['success'] === 1? 
            {
                success: 1,
                message: '' 
            }
            :
            {
                success: 0,
                message: 'Error al eliminar el diplomado: '+result['message']
            };
        return res.json(response);
    }

    @Delete(':id')
    async deleteCatedratico(@Param() param, @Res() res: Response):Promise<any>{
        const result = await this.catedraticoService.deleteCatedratico(param.id);
        const response = result['success'] === 1? 
            {
                success: 1,
                message: '' 
            }
            :
            {
                success: 0,
                message: 'Error al eliminar el catedratico: '+result['message']
            };
        return res.json(response);
    }
    
    @Put()
    async updateCatedratico(@Req() req:Request, @Res() res: Response):Promise<any>{
        //console.log(req.body);
        const result = await this.catedraticoService.updateCatedratico(req.body);
        const response = result['success'] === 1? 
            {
                success: 1,
                message: '',
                catedratico: req.body 
            }
            :
            {
                success: 0,
                message: 'Error al actualizar catedratico'+result['message'],
                catedratico: req.body
            };
        return res.json(response);
    }
}