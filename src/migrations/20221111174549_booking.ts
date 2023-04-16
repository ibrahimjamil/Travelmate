import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('booking', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.integer('amount').notNullable();
    t.integer('user_id').unsigned()
    t
        .foreign('user_id')
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    t.integer('vendor_id').unsigned()
    t
        .foreign('vendor_id')
        .references('id')
        .inTable('vendor')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    t.integer('matched_traveler_id').unsigned() // it will be given from travelmate service
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('booking');
}
