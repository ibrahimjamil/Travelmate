import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('travel_match', (t) => {
    t.increments('id');
    t.integer('traveler_id').unsigned().notNullable();
    t
        .foreign('traveler_id')
        .references('id')
        .inTable('traveler')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    t.integer('current_user_id').unsigned().notNullable();
    t
        .foreign('current_user_id')
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    t.boolean('is_match_finalized').defaultTo(false)
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('travel_match');
}
