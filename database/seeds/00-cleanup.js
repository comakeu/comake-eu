exports.seed = async function(knex) {
  if (
    process.env.DB_ENV === "development" ||
    process.env.DB_ENV === "testing"
  ) {
    await knex("votes").truncate();
    await knex("issues").truncate();
    await knex("users").truncate();
  }
};
