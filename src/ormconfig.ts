import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'typeormtest',
  password: 'typeormtest',
  database: 'test',
  // synchronize: false,
  migrationsTableName: 'migrations',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src/**/*{.ts,.js}',
    migrationsDir: 'src/migrations',
  },
};

export default config;
