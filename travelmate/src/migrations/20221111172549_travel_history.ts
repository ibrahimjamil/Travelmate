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
    t.integer('recommended_travelers_id').unsigned()
    t
        .foreign('recommended_travelers_id')
        .references('id')
        .inTable('recommended_travelers')
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
