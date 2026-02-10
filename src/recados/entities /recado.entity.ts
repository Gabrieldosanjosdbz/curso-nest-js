import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recado{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({type: 'varchar', length: 255})
    texto: string;

    @Column({default: false})
    lido: boolean; 

    @Column()
    data: Date; 

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    // Many Recado To One Pessoa
    // Sempre a ManyToOne que recebe a FK, então, na tabela recados, vai ser criado uma coluna para receber ela.
    @ManyToOne(() => Pessoa, pessoa => pessoa.recadoEnviados, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}) 
    @JoinColumn({ name: 'de' })
    de: Pessoa;

    @ManyToOne(() => Pessoa, pessoa => pessoa.recadosRecebidos, {onDelete: 'CASCADE', onUpdate: 'CASCADE'}) 
    @JoinColumn({ name: 'para' })
    para: Pessoa;

}
