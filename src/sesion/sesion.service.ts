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
}
