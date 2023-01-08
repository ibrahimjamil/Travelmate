import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('payment', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.integer('amount').notNullable();
    t.integer('vendor_id').unsigned().notNullable();
    t
        .foreign('vendor_id')
        .references('id')
        .inTable('vendor')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    t.integer('traveler_id').unsigned().notNullable();
    t
        .foreign('traveler_id')
        .references('id')
        .inTable('traveler')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('payment');
}
