  /* import { TypeOrmModuleOptions } from '@nestjs/typeorm'; */
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

  /* const config: TypeOrmModuleOptions = { */
  /* const config: DataSourceOptions = { */
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  /* cli: {
    migrationsDir: 'src/migrations',
  }, */
};

/* export default config; */
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;