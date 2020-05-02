import { Column,Model,Table, Default, AllowNull, PrimaryKey } from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table({tableName: "diplomado",timestamps: false})
export class Diplomado extends Model<Diplomado>{
    @PrimaryKey
    @Column
    id_diplomado: number;

    @Column
    nombre: string;

    @Column
    id_catedratico: number;

    @Column
    duracion_h: number;

    @Column
    no_sesiones: number;

    @Column
    lugar: string;

    @Column
    hora: string;

    @Column
    fecha_inicio: string;

    @Default(1)
    @Column
    estado: number;

    @AllowNull(true)
    @Column
    descripcion: string;

    @Column(DataTypes.VIRTUAL)
    sesiones:any[]
}