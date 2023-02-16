import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    // we will run cron of that class to pick location and filter based interest if any and assign them accordingly and will show to
    // frontend table recommended_traveler table (we will check history and gender with sme location travel).
  return knex.schema.createTable('recommended_traveler_user', (t) => {
    t.increments('id');
    t.integer('user_id').unsigned()
    t
        .foreign('user_id')
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    t.integer('recommended_traveler_id').unsigned()
    t
        .foreign('recommended_traveler_id')
        .references('id')
        .inTable('recommended_travelers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('recommended_traveler_user');
}
