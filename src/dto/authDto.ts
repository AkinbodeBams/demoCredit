import { IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { IsUniqueBvn } from "../lib";

export class tokenDto {
  constructor(token: string) {
    this.token = token;
  }
  @IsNotEmpty({ message: "token not provided" })
  @IsString()
  @Matches(/^\d{11}-\d{13}$/, {
    message: "invalid token format , ",
  })
  token: string;
}
export class generateTokenDto {
  constructor(bvn: string) {
    this.bvn = bvn;
  }

  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: "BVN must be exactly 11 characters long" })
  @Matches(/^\d+$/, { message: "BVN must contain only numbers" })
  bvn!: string;
}
