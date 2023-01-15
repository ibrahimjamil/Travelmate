import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('invite_traveler', (t) => {
    t.increments('id');
    t.string('email').notNullable();
    t.integer('user_id').unsigned()
    t
        .foreign('user_id')
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    t.string('social_link');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('invite_traveler');
}
