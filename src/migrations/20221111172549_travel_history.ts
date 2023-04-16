import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('travel_history', (t) => {
    t.increments('id');
    t.integer('user_id').unsigned()
    t
        .foreign('user_id')
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    t.integer('matched_traveler_id').unsigned()
    t
        .foreign('matched_traveler_id')
        .references('id')
        .inTable('matched_traveler')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    t.json('history_info')
    t.string('location')
    t.string('budget')
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('travel_history');
}
