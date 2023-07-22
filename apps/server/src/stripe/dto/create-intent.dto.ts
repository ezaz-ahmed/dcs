import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateIntenteDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsNumber()
  @IsNotEmpty()
  donor_id: number

  @IsString()
  @IsOptional()
  description?: string
}
