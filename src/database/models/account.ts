import { Model } from "objection";

export default class  Account extends Model {
  static tableName = "accounts";

  id!: string;
  userId!: string;
  accountNumber!: string;
  balance!: number;
  isActive!: boolean;
  createdAt!: string;
  updatedAt!: string;

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        accountNumber: { type: 'string', minLength: 10, maxLength: 10 },
        balance: { type: 'number' },
        isActive: { type: 'boolean' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }
}
