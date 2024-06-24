import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("accounts", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.decimal("balance", 14, 2).defaultTo(0);
    table.string("accountNumber").unique().notNullable();
    table.boolean("isActive").defaultTo(true);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("accounts");
}
