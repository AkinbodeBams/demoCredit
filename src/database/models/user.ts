import { Model } from "objection";

export class User extends Model {
  static tableName = "users";

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: ["string", "null"] },
        phoneNumber: { type: ["string", "null"] },
        bvn: { type: "string", minLength: 11, maxLength: 11 },
        accountNumber: { type: "string", minLength: 10, maxLength: 10 },
        firstName: { type: "string" },
        lastName: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }
}
