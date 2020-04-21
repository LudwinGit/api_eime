import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from "./dto/create-asignacion.dto";

@Controller('asignacion')
export class AsignacionController {
    constructor(
        private readonly asignacionService: AsignacionService
    ) { }

    @Post('reporte/:id')
    async reporteAsistencia(@Param('id') id: string): Promise<any[]> {
        return await this.asignacionService.reporteAsistencia(id);
    }

    @Post('asignar')
    async asignar(@Res() res, @Body() crearAsignacionDto: CreateAsignacionDto): Promise<any> {
        const resultado = await this.asignacionService.crearAsignacion(crearAsignacionDto);
        if (resultado === 0) {
            return res.json({ "success": 0, "message": "Ocurrio un error al crear la asignacion." })
        }
        return res.json({ "success": 1, "message": "" });
    }
}
