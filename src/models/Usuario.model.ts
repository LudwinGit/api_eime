import { Column,Model,Table, Default, AllowNull, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({tableName: "usuario",timestamps: false})
export class Usuario extends Model<Usuario>{
    
    @PrimaryKey
    @Column
    id_usuario: number;

    @Default('N/A')
    @Column
    nombre: string;

    @Default('N/A')
    @Column
    dpi: string;

    @Default('N/A')
    @Column
    correo: string;

    @AllowNull(true)
    @Column
    telefono: string;

    @Column
    id_rol : number;

    @AllowNull(true)
    @Column
    direccion: string;

    @AllowNull(true)
    @Column
    foto: string;

    @AllowNull(true)
    @Column
    carne: string;

    @AllowNull(true)
    @Column
    carrera: string;

    @AllowNull(true)
    @Column
    firma: string;
}