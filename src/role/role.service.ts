import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rol } from 'src/models/Rol.model';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Rol)
        private rolModel: typeof Rol
    ) { }

    async findOne(id): Promise<Rol> {
        return await this.rolModel.findOne({ where: { id_rol: id } });
    }
}
