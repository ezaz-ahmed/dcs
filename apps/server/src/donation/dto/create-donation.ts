import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'

export class CreateDonation {
  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsOptional()
  @IsString()
  description?: string
}
