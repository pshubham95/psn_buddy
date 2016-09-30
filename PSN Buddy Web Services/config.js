//Replace the uname and pwd
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:12345@localhost:5432/PSN_BUDDY_DB';
//var connectionString = process.env.DATABASE_URL || 'postgres://u3efba1701e0b4ea1b7037d151ccf7a98:787e810ac72647e4984d908840829dc9@10.72.6.143:5432/d1b86c80cdc0a44ccbbdb2d464d80a7f7?sslmode=disable';

module.exports = connectionString;