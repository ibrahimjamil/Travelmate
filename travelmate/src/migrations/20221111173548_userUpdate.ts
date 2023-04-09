import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user', (t) => {
  });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('user', (table) => {
    });
}
