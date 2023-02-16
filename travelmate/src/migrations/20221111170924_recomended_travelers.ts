import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // this will be the copy of user class with all filters to match upon with logged in user.
  return knex.schema.createTable('recommended_travelers', (t) => {
    t.increments('id');
    t.string('name');
    t.string('email');
    t.string('rating');
    t
      .foreign('user_id')
      .references('id')
      .inTable('user')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.boolean('is_match_finalized').defaultTo(false)
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('recommended_travelers');
}
