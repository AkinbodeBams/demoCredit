import { Model } from "objection";
import Account from "./account";

export default class User extends Model {
  static tableName = "users";

  id!: string;
  firstName!: string;
  lastName!: string;
  email: string | null = null;
  phoneNumber: string | null = null;
  bvn!: string;
  createdAt!: string;
  updatedAt!: string;
  domain: string | null = null;

  account?: Account;

  static relationMappings = {
    account: {
      relation: Model.HasOneRelation,
      modelClass: Account,
      join: {
        from: "users.id",
        to: "accounts.userId",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: ["string", "null"] },
        phoneNumber: { type: ["string", "null"] },
        domain: { type: ["string", "null"] },
        bvn: { type: "string", minLength: 11, maxLength: 11 },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }
}
