import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { Profile } from './profile/profile.entity';
import { Job } from './jobs/job.entity';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'rezzy',
  password: process.env.DATABASE_PASSWORD || 'rezzy_secure_password',
  database: process.env.DATABASE_NAME || 'rezzy_db',
  entities: [User, Profile, Job],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.LOG_LEVEL === 'debug',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  extra: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
};
