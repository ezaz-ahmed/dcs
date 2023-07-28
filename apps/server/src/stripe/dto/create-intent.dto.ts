import { IsCurrency, IsISO4217CurrencyCode, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, isCurrency } from "class-validator"

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

  @IsNotEmpty()
  @IsISO4217CurrencyCode()
  currency: string
}
