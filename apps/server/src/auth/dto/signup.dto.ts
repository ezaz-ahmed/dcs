import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(240)
  password: string
}