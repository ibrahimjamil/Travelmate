import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (t) => {
    t.increments('id');
    t.string('first_name').notNullable();
    t.string('last_name').notNullable();
    t.string('email').notNullable();
    t.string('type').notNullable();
    t.string('age').notNullable();
    t.string('gender').notNullable();
    t.string('location').notNullable();
    t.string('expectedMateAge').notNullable();
    t.string('expectedVisitingPlaces').notNullable();
    t.string('travelLocationsPreference').notNullable();
    t.string('genderPreference').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user');
}
