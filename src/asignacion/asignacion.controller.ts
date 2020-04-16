import { Controller, Get, Post, Req, Res, Delete, Query, Put, Param } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { AsignacionService } from './asignacion.service';

@Controller('asignacion')
export class AsignacionController {
    constructor(
        private readonly asignacionService: AsignacionService
    ){}

    @Get('reporte/:id')
    async reporteAsistencia(@Param('id') id:string):Promise<any[]>{
        return await this.asignacionService.reporteAsistencia(id);
    }
}
