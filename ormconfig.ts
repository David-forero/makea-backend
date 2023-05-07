module.exports = {
    type: 'mongodb',
    url: 'mongodb://localhost:27017/my-database',
    synchronize: true,
    useUnifiedTopology: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  };