import { Injectable } from '@nestjs/common';
import { Asignacion } from 'src/models/Asignacion.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

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
                    on asg.id_curso = s.id_curso
                    inner join asistencia ast
                    on s.id_sesion = ast.id_sesion
                    where asg.id_curso=:_id_curso AND ast.id_usuario = u.id_usuario
                    group by u.dpi, u.nombre;`,
                    {
                        replacements: {
                            _id_curso: id
                        }
                    });
            return result[0];
        } catch (err) {
            console.log('ERROR:')
            console.log(err)
            return null;
        }
    }

    async cursosUsuario(id: number): Promise<any[]> {
        try {
            const result = await this.sequelize
                .query(`select b.* from asignacion a
                        join curso b on a.id_curso = b.id_curso
                        where id_usuario = ${id}`);
            return result[0];
        } catch (err) {
            console.log(err)
            return null;
        }
    }
}
