import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    // @IsNotEmpty({message: "Please enter email"})
    email: string;

    @IsNotEmpty({message: "Please enter password"})
    @MinLength(6, {message: "Password must be at least 6 characters"})
    @MaxLength(20, {message: "Password must not be greater than 20 characters"})
    password : string;

    @IsNotEmpty({message: "Please enter name"})
    @MinLength(2, {message: "Username must be at least 2 characters"})
    @MaxLength(120, {message: "Username must not be greater than 120 characters"})
    username : string;
}
