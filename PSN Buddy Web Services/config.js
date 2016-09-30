var connectionString = process.env.DATABASE_URL || 'postgres://isurvey:isurvey@localhost:5432/PSNProject';
module.exports = connectionString;