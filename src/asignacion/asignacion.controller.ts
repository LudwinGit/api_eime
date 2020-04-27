import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from "./dto/create-asignacion.dto";
import { DiplomadoService } from 'src/diplomado/diplomado.service';

@Controller('asignacion')
export class AsignacionController {
    constructor(
        private readonly asignacionService: AsignacionService,
        private readonly diplomadoService: DiplomadoService
    ) { }

    @Post('reporte/:id')
    async reporteAsistencia(@Param('id') id: string): Promise<any[]> {
        return await this.asignacionService.reporteAsistencia(id);
    }

    @Post('asignar')
    async asignar(@Res() res, @Body() crearAsignacionDto: CreateAsignacionDto): Promise<any> {
        let diplomado = await this.diplomadoService.findOne(crearAsignacionDto.id_curso);
        diplomado = diplomado[0][0];

        if (diplomado === undefined)
            return res.json({ success: 0, message: "El diplomado ya ha comenzado." })

        // if (diplomado.fecha_inicio < timestamp)
        const resultado = await this.asignacionService.crearAsignacion(crearAsignacionDto);

        if (resultado === 0) {
            return res.json({ "success": 0, "message": "Ocurrio un error al crear la asignacion." })
        }
        return res.json({ "success": 1, "message": "" });
    }

    @Get('validacion/:codigo')
    async validar(@Res() res, @Param() params): Promise<any> {
        const resultado = await this.asignacionService.validar(params.codigo);

        console.log(resultado);
        

        if (resultado[0].diplomado === null)
            return res.json({
                "success": 0,
                "diplomado": "",
                "estudiante": "",
                "aprobado": 0
            })

        return res.json({
            "success": 1,
            "diplomado": resultado[0].diplomado,
            "estudiante": resultado[0].estudiante,
            "aprobado": resultado[0].aprobado
        });
    }
}
