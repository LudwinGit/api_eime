import { Column,Model,Table, Default, AllowNull, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({tableName: "historial_password",timestamps: false})
export class Password extends Model<Password>{
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id_password: number;

    @Column
    pwd: string;

    @Column
    fecha_hora: Date;

    @Column
    id_usuario: number;

    @Column
    active: string;
}