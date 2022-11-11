import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.integer('traveler_id').unsigned().notNullable();
    t
      .foreign('traveler_id')
      .references('id')
      .inTable('traveler')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    t.string('type').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user');
}
