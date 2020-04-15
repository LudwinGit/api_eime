import { Column,Model,Table,PrimaryKey } from "sequelize-typescript";

@Table({tableName: "rol",timestamps: false})
export class Rol extends Model<Rol>{
    
    @PrimaryKey
    @Column
    id_rol: number;

    @Column
    nombre: string;
}