import { Injectable } from '@nestjs/common';
import { Sesion } from 'src/models/Sesion.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

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
            //Aqui utilizar el metodo de Ludwin para el codigo unico en asignacion
            let code = 'YHLQMDLG' //Aqui llamar a esa funcion
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
