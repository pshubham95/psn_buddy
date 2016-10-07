
var connectionString = process.env.DATABASE_URL || 'postgres://isurvey:isurvey@localhost:5432/PSNProject';
//var connectionString = process.env.DATABASE_URL || 'postgres://postgres:12345@localhost:5432/PSN_BUDDY_DB';
module.exports = connectionString;