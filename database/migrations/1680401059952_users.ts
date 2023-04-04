import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id"); // or table.uuid('id').primary() for UUID
      table.string("email", 255).notNullable().unique();
      table.string("password", 180).notNullable();
      table.string("first_name", 255).nullable();
      table.string("last_name", 255).nullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}