import { IsEmail, IsEmpty, Max, Min } from "class-validator";

// export class CreateUserDto {}
export class CreateUserDto {
    @IsEmail()
    @IsEmpty({message: "Please enter"})
    email: string;

    @IsEmpty({message: "Please enter"})
    @Min(6)
    @Max(10)
    password : string;

    @IsEmpty({message: "Please enter"})
    @Min(2)
    @Max(120)
    name : string;
}
