import { Column,Model,Table, Default, AllowNull, PrimaryKey } from "sequelize-typescript";

@Table({tableName: "curso",timestamps: false})
export class Curso extends Model<Curso>{
    
    @PrimaryKey
    @Column
    id_curso: number;

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

    @Default('B\'1\'')
    @Column
    estado: number;

    @AllowNull(true)
    @Column
    descripcion: string;
}