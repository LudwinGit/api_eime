import { Injectable } from '@nestjs/common';
import { Sesion } from 'src/models/Sesion.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SesionService {
    constructor(
        @InjectModel(Sesion)
        private sesionModel: typeof Sesion,
        private sequelize: Sequelize
    ){}

    async findAll(): Promise<Sesion[]> {
        return await this.sesionModel.findAll();
    }

    async addSesion(s):Promise<{}>{
        try{
            let code:string = uuidv4()
            code = code.substring(0,10)
        
            const new_id = await this.sequelize
                .query('SELECT nextval(pg_get_serial_sequence(\'sesion\', \'id_sesion\'))');
            
            code=code+new_id[0][0]['nextval'];

            const result = await this.sequelize
                .query('INSERT INTO sesion(id_diplomado,codigo_validacion,fecha,hora_inicio,hora_limite)'+
                'VALUES(:id_diplomado, :codigo_validacion, :fecha, :hora_inicio, :hora_limite)', 
                {replacements: { 
                    id_diplomado: s.id_diplomado,
                    codigo_validacion: code,
                    fecha:s.fecha,
                    hora_inicio:s.hora_inicio,
                    hora_limite:s.hora_limite
                }});
            return {success: 1, message: '', code: code};
        }catch(err){
          console.log('ERROR:')
          console.log(err)
          return {success:0,  message:err, code: null};
        } 
    }
}
