import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('traveler', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.string('email').notNullable();
    t.json('traveler_info').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('traveler');
}
