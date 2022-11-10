import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('travelmate', (t) => {
    t.increments('id');
    t.string('email').notNullable();
    t.string('type').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('travelmate');
}
