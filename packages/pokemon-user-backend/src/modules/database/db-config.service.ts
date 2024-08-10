import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SomeEntity } from './entities/some.entity';

@Injectable()
export class DbConfigService {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'pokemon',
      entities: [SomeEntity],
      synchronize: true,
    };
  }
}
