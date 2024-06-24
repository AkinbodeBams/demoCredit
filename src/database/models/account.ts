import { Model } from "objection";

export class Account extends Model {
  static tableName = "accounts";

  id!: string;
  userId!: string;
  balance!: number;
  createdAt!: string;
  updatedAt!: string;
}
