import { IsISO4217CurrencyCode, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator'

export class CreateDonation {
  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsOptional()
  @IsString()
  description?: string

  @IsNotEmpty()
  @IsISO4217CurrencyCode()
  currency: string
}
