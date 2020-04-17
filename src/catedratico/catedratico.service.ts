import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from 'src/models/Usuario.model';
import { Sequelize} from 'sequelize';
import { Curso } from 'src/models/Curso.model';
import { Sesion } from 'src/models/Sesion.model';

@Injectable()
export class CatedraticoService {
  constructor(
      @InjectModel(Usuario)
      private usuarioModel: typeof Usuario,
      @InjectModel(Curso)
      private cursoModel: typeof Curso,
      @InjectModel(Sesion)
      private sesionModel: typeof Sesion,
      private sequelize: Sequelize
  ){}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioModel.findAll({attributes: ['id_usuario', 'nombre', 'carrera', 'correo','dpi', 'telefono'],where:{id_rol:2}});
  }

  async findCourses(id):Promise<any[]>{
    const courses = await this.cursoModel.findAll({where:{id_catedratico:id}});
    for(const c of courses){
      const sesiones = await this.sesionModel.findAll({where:{id_curso:c.id_curso}});
      c.sesiones = sesiones
    }
    return courses
  }

  async addCatedratico(ct):Promise<number>{ 
    try{
      const result = await this.sequelize
      .query(' SELECT create_user_catedratico (:nombre, :dpi, :correo, :telefono, :pwd, :direccion, :foto, :carrera, :firma)', 
        {replacements: { 
            nombre: ct.nombre, 
            dpi: ct.cui, 
            correo: ct.correo, 
            telefono: ct.telefono, 
            pwd: ct.pwd, 
            direccion: ct.direccion, 
            foto: ct.foto, 
            carrera: ct.carrera,
            firma: ct.firma 
      }});
      return 1;
    }catch(err){
      console.log('ERROR:')
      console.log(err)
      return 0;
    } 
  }

  async deleteCatedratico(id):Promise<number>{ 
    try {
      const result = await this.usuarioModel.destroy({ where: { id_usuario: id} });
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

  async updateCatedratico(ct):Promise<number>{ 
    try{
      const result = await this.usuarioModel.update({
          nombre: ct.nombre,
          carrera: ct.carrera,
          correo: ct.correo,
          dpi: ct.cui,
          telefono: ct.telefono
        },
        { where: {id_usuario:ct.id_usuario}
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