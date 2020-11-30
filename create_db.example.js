const pgtools = require("pgtools");
const config = {
  user: "postgres",
  host: "localhost",
  password: "password",
  port: 5432
};

pgtools.createdb(config, "star_global", function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});
