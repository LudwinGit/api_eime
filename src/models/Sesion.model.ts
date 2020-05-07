import { Column,Model,Table, Default, AllowNull, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({tableName: "sesion",timestamps: false})
export class Sesion extends Model<Sesion>{
    
    @PrimaryKey
    @Column
    id_sesion: number;
    
    @Column
    id_diplomado : number;

    @Column
    codigo_validacion: string;

    @Column
    fecha: string;

    @AllowNull(true)
    @Column
    hora_inicio: string;

    @AllowNull(true)
    @Column
    hora_limite: string;
}