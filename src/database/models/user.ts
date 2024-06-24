import { Model } from "objection";

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

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: ["string", "null"] },
        phoneNumber: { type: ["string", "null"] },
        bvn: { type: "string", minLength: 11, maxLength: 11 },
        firstName: { type: "string" },
        lastName: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }
}
