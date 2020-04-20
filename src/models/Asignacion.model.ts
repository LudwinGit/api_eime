import { Column,Model,Table, Default, AllowNull, PrimaryKey } from "sequelize-typescript";

@Table({tableName: "asignacion",timestamps: false})
export class Asignacion extends Model<Asignacion>{
    
    @PrimaryKey
    @Column
    id_usuario: number;

    @PrimaryKey
    @Column
    id_curso: number;

    @Column
    fecha_hora: string;
}