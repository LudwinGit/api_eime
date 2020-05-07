import { Injectable } from '@nestjs/common';
import { Sequelize, INTEGER } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Sesion } from 'src/models/Sesion.model';
import moment = require('moment-timezone');

@Injectable()
export class AsistenciaService {
    constructor(
        @InjectModel(Sesion)
        private sesionModel: typeof Sesion,
        private sequelize: Sequelize
    ) { }

    async validarAsistencia(va): Promise<{}> {
        const sesion = await this.sesionModel.findOne({ attributes: ['id_sesion'], where: { codigo_validacion: va.codigo_validacion } })
        if (sesion == null) {
            return await { success: 0, message: 'Codigo de sesion no valido' };
        }
        try {
            let date = moment().tz('America/Guatemala');
            const result = await this.sequelize
                .query('SELECT validar_asistencia(:id_usuario,:id_sesion,:codigo_validacion,:fecha_hora)',
                    {
                        replacements: {
                            id_usuario: va.id_usuario,
                            id_sesion: sesion.id_sesion,
                            codigo_validacion: va.codigo_validacion,
                            fecha_hora: date.format('YYYY-MM-DD HH:m:s')
                        }
                    });
            if (result[0][0]['validar_asistencia'] == 1) {
                return await { success: 1, message: 'Asistencia validada con exito' };
            } else {
                return await { success: 0, message: result[0][0]['validar_asistencia'] };
            }
        } catch (err) {
            return await { success: 0, message: err };
        }
    }
}