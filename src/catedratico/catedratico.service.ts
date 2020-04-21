import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from 'src/models/Usuario.model';
import { Sequelize} from 'sequelize';
import { Diplomado } from 'src/models/Diplomado.model';
import { Sesion } from 'src/models/Sesion.model';

@Injectable()
export class CatedraticoService {
  constructor(
      @InjectModel(Usuario)
      private usuarioModel: typeof Usuario,
      @InjectModel(Diplomado)
      private diplomadoModel: typeof Diplomado,
      @InjectModel(Sesion)
      private sesionModel: typeof Sesion,
      private sequelize: Sequelize
  ){}

  async findAll(): Promise<Usuario[]> {
    
    return await this.usuarioModel.findAll({where:{id_rol:2}});
  }

  /*async findCourses(id):Promise<any[]>{
    const courses = await this.diplomadoModel.findAll({where:{id_catedratico:id}});
    for(const c of courses){
      const sesiones = await this.sesionModel.findAll({where:{id_diplomado:c.id_diplomado}});
      c.sesiones = sesiones
    }
    return courses
  }*/

  async addCatedratico(ct):Promise<{}>{ 
    try{
      const result = await this.sequelize
      .query(' SELECT create_user_catedratico (:nombre, :dpi, :correo, :telefono, :pwd, :direccion, :foto, :carrera, :firma)', 
        {replacements: { 
            nombre: ct.nombre, 
            dpi: ct.dpi, 
            correo: ct.correo, 
            telefono: ct.telefono, 
            pwd: ct.pwd,
            direccion: ct.direccion, 
            foto: ct.foto, 
            carrera: ct.carrera,
            firma: ct.firma 
      }});
      return {success:1,message:''};
    }catch(err){
      console.log('ERROR:')
      console.log(err)
      return {success:0,message:err};
    } 
  }

  /*async deleteCatedratico(id):Promise<{}>{ 
    try {
      const result = await this.usuarioModel.update({debaja:'B1'},{where:{id_usuario:id}});
      if(result[0]>0){
        return {sucess:1, message:''};
      }else{
        return {sucess:0, message:'No existe el catedratico'};
      }
    } catch (err) {
      console.log('ERROR:')
      console.log(err)
      return {sucess:0, message:'Exception'+err};
    }
  }
  
  async updateCatedratico(ct):Promise<number>{ 
    try{
      const result = await this.usuarioModel.update({
          nombre: ct.nombre, 
          dpi: ct.dpi, 
          correo: ct.correo, 
          telefono: ct.telefono, 
          pwd: ct.pwd, //////////////////////La tablla no tiene un pwd
          direccion: ct.direccion, 
          foto: ct.foto, 
          carrera: ct.carrera,
          firma: ct.firma
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
  }*/
}