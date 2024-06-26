import { IsString, Matches } from "class-validator";

export class AuthDto {
  constructor(token: string) {
    this.token = token;
  }

  @IsString()
  @Matches(/^\d{11}-\d{13}$/, {
    message: "invalid token format , ",
  })
  token: string;
}
