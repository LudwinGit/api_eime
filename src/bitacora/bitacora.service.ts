import { Injectable } from '@nestjs/common';
import { Sequelize} from 'sequelize';

@Injectable()
export class BitacoraService {
    constructor(
        private sequelize: Sequelize
    ){}

    async findAll(): Promise<any[]> {
        const bitacora = await this.sequelize
            .query(`
                SELECT u.nombre, u.carne, u.dpi, b.fecha_hora, b.ip
                FROM usuario u
                INNER JOIN bitacora b
                ON u.id_usuario = b.id_usuario;
            `); 
        return bitacora[0];
    }
}

