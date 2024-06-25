import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("accountId").notNullable();
    table.enum("type", ["credit", "debit"]).notNullable();
    table.decimal("amount", 14, 2).notNullable();
    table.string("description").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table
      .foreign("accountId")
      .references("id")
      .inTable("accounts")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("transactions");
}
