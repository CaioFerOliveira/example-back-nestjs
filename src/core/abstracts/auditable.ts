import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber } from "class-validator";

export abstract class Auditable {
    @ApiProperty({
        description: 'Identificador do usuário que realizou a operação',
        type: Number,
    })
    @IsNumber()
    public registeredBy?: number

    @ApiProperty({
        description: 'Data em que usuário que realizou a operação',
        type: Date,
    })
    @IsDate()
    public createdAt?: Date;

    @ApiProperty({
        description: 'Identificador do usuário que realizou a alteração',
        type: Number,
    })
    @IsNumber()
    public updatedBy?: number;

    @ApiProperty({
        description: 'Data em que usuário que realizou a alteração',
        type: Date,
    })
    @IsDate()
    public updatedAt?: Date;
}