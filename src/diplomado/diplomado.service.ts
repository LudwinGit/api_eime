import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { Diplomado } from 'src/models/Diplomado.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DiplomadoService {
    constructor(
        @InjectModel(Diplomado)
        private diplomadoModel: typeof Diplomado,
        private sequelize: Sequelize
    ){}

    async findAll(): Promise<any[]> {
        return this.diplomadoModel.findAll();
    }

    async addDiplomado(cs):Promise<number>{ 
        try{
            const result = await this.sequelize
            .query('INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)'+
            'VALUES(:nombre,:id_catedratico, :duracion_h, :no_sesiones, :lugar, :hora, :fecha_inicio, :descripcion)', 
            {replacements: { 
                nombre: cs.nombre,
                id_catedratico: cs.catedratico,
                duracion_h: cs.duracion,
                no_sesiones: cs.sesiones,
                lugar: cs.lugar,
                hora: cs.hora,
                fecha_inicio: cs.fecha_inicio,
                descripcion: cs.descripcion 
          }});
          //console.log(result)
          return 1;
        }catch(err){
          console.log('ERROR:')
          console.log(err)
          return 0;
        } 
    }

    async deleteDiplomado(id):Promise<number>{ 
        try {
          const result = await this.diplomadoModel.destroy({ where: { id_diplomado: id} });
          if(result===1){
            return 1;
          }else{
            return 0;
          }
        } catch (err) {
          console.log('ERROR:')
          console.log(err)
          return 0;
        }
    }

    async updateDiplomado(cs):Promise<number>{ 
        try{
          const result = await this.diplomadoModel.update({
              nombre: cs.nombre,
              id_catedratico: cs.catedratico,
              duracion_h: cs.duracion,
              no_sesiones: cs.sesiones,
              lugar: cs.lugar,
              hora: cs.hora,
              fecha_inicio: cs.fecha_inicio,
              descripcion: cs.descripcion   
            },
            { where: {id_diplomado:cs.id}
          });
          if(result[0]>0){
            return 1;
          }else{
            return 0;
          }
        }catch(err){
          console.log('ERROR:')
          console.log(err)
          return 0;
        }
      }
}