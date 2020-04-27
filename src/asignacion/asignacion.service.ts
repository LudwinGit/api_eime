import { Injectable } from '@nestjs/common';
import { Asignacion } from 'src/models/Asignacion.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import moment = require('moment');

@Injectable()
export class AsignacionService {
    constructor(
        @InjectModel(Asignacion)
        private asignacionModel: typeof Asignacion,
        private sequelize: Sequelize
    ) { }

    async reporteAsistencia(id): Promise<any[]> {
        try {
            const result = await this.sequelize
                .query(`select u.dpi, u.nombre,
                        (count(ast.id_sesion) FILTER (WHERE ast.asistio = B'1'))::numeric/count(ast.id_sesion)*100 as Asistencia,
                        (count(ast.id_sesion) FILTER (WHERE ast.asistio = B'0'))::numeric/count(ast.id_sesion)*100 as Inasistencia
                    from usuario u
                    inner join asignacion asg
                    on u.id_usuario = asg.id_usuario
                    inner join sesion s
                    on asg.id_diplomado = s.id_diplomado
                    inner join asistencia ast
                    on s.id_sesion = ast.id_sesion
                    where asg.id_diplomado=:_id_diplomado AND ast.id_usuario = u.id_usuario
                    group by u.dpi, u.nombre;`,
                    {
                        replacements: {
                            _id_diplomado: id
                        }
                    });
            return result[0];
        } catch (err) {
            console.log('ERROR:')
            console.log(err)
            return null;
        }
    }

    //CORREGIR tomar en cuenta que la tabla curso, ya no existe. Si esta solucionado ignorar este comentario.
    async cursosUsuario(id: number): Promise<any[]> {
        try {
            const result = await this.sequelize
                .query(`select b.* from asignacion a
                        join diplomado b on a.id_diplomado = b.id_diplomado
                        where id_usuario = ${id}`);
            return result[0];
        } catch (err) {
            console.log(err)
            return null;
        }
    }

    async asignacionesUsuario(id: number): Promise<any[]> {
        let date = new Date();

        try {
            const result = await this.sequelize
                .query(`select * from diplomado a
                        where a.estado = '1' and a.id_diplomado not in(select id_diplomado from asignacion where id_usuario = ${id}) and a.fecha_inicio >= '${moment().format("YYYY-MM-DD")}'`);
            return result[0];
        } catch (err) {
            console.log(err)
            return null;
        }
    }

    async crearAsignacion(crearAsignacionDto: CreateAsignacionDto) {
        let date = new Date();
        let timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
        let codigo_unico = crearAsignacionDto.id_usuario + crearAsignacionDto.id_curso + Math.random().toString(36).substring(7);
        try {
            const result = await this.sequelize
                .query(`INSERT INTO asignacion values(${crearAsignacionDto.id_usuario},${crearAsignacionDto.id_curso},'${timestamp}','${codigo_unico}')`);
            return 1;
        } catch (err) {
            console.log(err)
            return 0;
        }
    }

    async validar(codigo: string): Promise<any> {
        const resultado = await this.sequelize.query(`select * from f_validar_codigo('${codigo}')`);
        return resultado[0];
    }
}
