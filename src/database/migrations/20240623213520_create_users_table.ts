import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").nullable().unique();
    table.string("phoneNumber").nullable().unique();
    table.string("bvn").notNullable().unique();
    table.string("domain").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
