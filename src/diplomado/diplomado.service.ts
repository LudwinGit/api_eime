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
  ) { }

  async findAll(): Promise<any[]> {
    return this.diplomadoModel.findAll();
  }

  async findOne(id_diplomado: number): Promise<any> {
    let date = new Date();
    let timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return await this.sequelize.query(`SELECT * FROM diplomado where id_diplomado = ${id_diplomado} and fecha_inicio >= '${timestamp}'`)
  }

  async addDiplomado(cs): Promise<{}> {
    try {
      const result = await this.sequelize
        .query('INSERT INTO diplomado(nombre,id_catedratico,duracion_h,no_sesiones, lugar, hora, fecha_inicio,descripcion)' +
          'VALUES(:nombre,:id_catedratico, :duracion_h, :no_sesiones, :lugar, :hora, :fecha_inicio, :descripcion)',
          {
            replacements: {
              nombre: cs.nombre,
              id_catedratico: cs.id_catedratico,
              duracion_h: cs.duracion_h,
              no_sesiones: cs.no_sesiones,
              lugar: cs.lugar,
              hora: cs.hora,
              fecha_inicio: cs.fecha_inicio,
              descripcion: cs.descripcion
            }
          });
      return { success: 1, message: '' };
    } catch (err) {
      console.log('ERROR:')
      console.log(err)
      let message = err['parent']['code'] != 23505 ? err : err['parent']['detail'];
      return { success: 0, message };
    }
  }

  async deleteDiplomado(id): Promise<{}> {
    try {
      const result = await this.diplomadoModel.destroy({ where: { id_diplomado: id } });
      if (result === 1) {
        return { success: 1, message: '' };
      } else {
        return { success: 0, message: 'No existe el registro' };
      }
    } catch (err) {
      console.log('ERROR:')
      console.log(err)
      return { success: 0, message: err };
    }
  }

  async updateDiplomado(cs): Promise<{}> {
    try {
      const result = await this.diplomadoModel.update({
        nombre: cs.nombre,
        id_catedratico: cs.id_catedratico,
        duracion_h: cs.duracion_h,
        no_sesiones: cs.no_sesiones,
        lugar: cs.lugar,
        hora: cs.hora,
        fecha_inicio: cs.fecha_inicio,
        estado: cs.estado,
        descripcion: cs.descripcion
      },
        {
          where: { id_diplomado: cs.id_diplomado }
        });
      if (result[0] > 0) {
        return { success: 1, message: '' };
      } else {
        return { success: 0, message: 'diplomado inexistente' };
      }
    } catch (err) {
      console.log('ERROR:')
      console.log(err)
      return { success: 0, message: err };
    }
  }
}