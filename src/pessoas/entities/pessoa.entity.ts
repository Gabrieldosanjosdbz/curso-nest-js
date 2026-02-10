import { IsEmail } from "class-validator";
import { Recado } from "src/recados/entities /recado.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column({length: 255})
    passwordHash: string;

    @Column({length: 100})
    nome: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date

    // One Pessoa To Many Recados (recados Enviados)
    // Na tabela Pessoas não vai ser modificado nada. Isso é apenas uma flag para a aplicação fazer consultas futuras
    // Ou seja, mapear o lado inverso da relação.
    @OneToMany(() => Recado, recado => recado.de)
    recadoEnviados: Recado[];

    //One Pessoa To Many Recados (recados Recebidos)
    @OneToMany(() => Recado, recado => recado.para)
    recadosRecebidos: Recado[]
}
