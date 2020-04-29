import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from 'src/models/Usuario.model';
import { Sequelize} from 'sequelize';
import { Diplomado } from 'src/models/Diplomado.model';
import { Sesion } from 'src/models/Sesion.model';
import { Password } from 'src/models/Password.model';

@Injectable()
export class CatedraticoService {
  constructor(
      @InjectModel(Usuario)
      private usuarioModel: typeof Usuario,
      @InjectModel(Diplomado)
      private diplomadoModel: typeof Diplomado,
      @InjectModel(Sesion)
      private sesionModel: typeof Sesion,
      @InjectModel(Password)
      private passwordModel: typeof Password,
      private sequelize: Sequelize
  ){}

  async findAll(): Promise<Usuario[]> {
    const catedraticos = await this.usuarioModel.findAll({where:{id_rol:2}});
    for(const c of catedraticos){
      let password = await this.passwordModel.findOne({
          attributes: ['pwd'],
          where:
            { id_usuario: c.id_usuario, active: '1' }
        });
        c.password = password.pwd;
    }
    return catedraticos;
  }

  async findCourses(id):Promise<any[]>{
    const diplomados = await this.diplomadoModel.findAll({where:{id_catedratico:id}});
    for(const d of diplomados){
      const sesiones = await this.sesionModel.findAll({where:{id_diplomado:d.id_diplomado}});
      d.sesiones = sesiones
    }
    return diplomados
  }

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
      const setImg = await this.sequelize
        .query('UPDATE usuario SET img_seguridad = :sec_img WHERE correo = :correo',{
          replacements:{
            sec_img:ct.sec_img,
            correo: ct.correo
          }
        })
      return {success:1,message:''};
    }catch(err){
      console.log('ERROR:')
      console.log(err)
      return {success:0,message:err};
    } 
  }

  async deleteCatedratico(id):Promise<{}>{ 
    try {
      const result = await this.usuarioModel.update({debaja:'B1'},{where:{id_usuario:id}});
      if(result[0]>0){
        return {success:1, message:''};
      }else{
        return {success:0, message:'No existe el catedratico'};
      }
    } catch (err) {
      console.log('ERROR:')
      console.log(err)
      return {success:0, message:'Exception'+err};
    }
  }

  async deleteCatedraticoDiplomado(body):Promise<{}>{ 
    try {
      const result = await this.diplomadoModel.update(
        {estado:'B0'},
        {where:{
            id_catedratico:body.id_catedratico,
            id_diplomado:body.id_diplomado
          }});
      if(result[0]>0){
        return {success:1, message:''};
      }else{
        return {success:0, message:'No existe el diplomado'};
      }
    } catch (err) {
      console.log('ERROR:')
      console.log(err)
      return {success:0, message:'Exception'+err};
    }
  }
  
  async updateCatedratico(ct):Promise<{}>{ 
    try{
      const result = await this.usuarioModel.update({
          nombre: ct.nombre, 
          dpi: ct.dpi, 
          correo: ct.correo, 
          debaja: ct.debaja,
          telefono: ct.telefono, 
          direccion: ct.direccion, 
          foto: ct.foto,
          carrera: ct.carrera,
          firma: ct.firma
        },
        { where: {id_usuario:ct.id_usuario}
      });
      if(result[0]>0){
        let password: Password = await this.passwordModel.findOne({
          where: {
              active: '1',
              id_usuario: ct.id_usuario,
            }
          });
        await this.passwordModel.update({
          pwd:ct.pwd
        }, {where:{id_password:password.id_password}})
        if(ct.sec_img!=null){
          console.log('Actualiza');
          await this.sequelize.query('UPDATE usuario SET img_seguridad = :sec_img WHERE id_usuario = :id_usuario',{
            replacements:{
              sec_img:ct.sec_img,
              id_usuario:ct.id_usuario
            }
          })
        }
        return {success: 1, message: ''};
      }else{
        return {success:0, message:'No existe el profesor'}
      }
    }catch(err){
      console.log('ERROR:')
      console.log(err)
      return {success:0, message:'Error en BD '+err}
    }
  }
}