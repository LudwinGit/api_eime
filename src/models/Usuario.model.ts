import { Column, Model, Table, Default, AllowNull, PrimaryKey, AutoIncrement, Unique } from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table({ tableName: "usuario", timestamps: false })
export class Usuario extends Model<Usuario>{

    @PrimaryKey
    @AutoIncrement
    @Column
    id_usuario: number;

    @Default('N/A')
    @Unique
    @Column
    nombre: string;

    @Default('N/A')
    @Unique
    @Column
    dpi: string;

    @Default('N/A')
    @Unique
    @Column
    correo: string;

    // @Default('B\'0\'')
    @Column
    debaja: string;

    @Column
    id_rol: number;

    @AllowNull(true)
    @Column
    direccion: string;

    @AllowNull(true)
    @Column
    telefono: string;

    @AllowNull(true)
    @Column
    foto: string;

    @AllowNull(true)
    @Unique
    @Column
    carne: string;

    @AllowNull(true)
    @Column
    carrera: string;

    @AllowNull(true)
    @Column
    firma: string;

    @Column(DataTypes.VIRTUAL)
    password: any;

    @AllowNull(true)
    @Column
    img_seguridad: string;
}