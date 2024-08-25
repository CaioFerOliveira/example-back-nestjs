import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export abstract class Auditable {
    @ApiProperty({
        description: 'Identificador do usuário que realizou a operação',
        type: String,
    })
    @IsString()
    public createdBy: string

    @ApiProperty({
        description: 'Data em que usuário que realizou a operação',
        type: Date,
    })
    @IsDate()
    public createdAt?: Date;

    @ApiProperty({
        description: 'Identificador do usuário que realizou a alteração',
        type: String,
    })
    @IsString()
    public updatedBy?: string;

    @ApiProperty({
        description: 'Data em que usuário que realizou a alteração',
        type: Date,
    })
    @IsDate()
    public updatedAt?: Date;
}