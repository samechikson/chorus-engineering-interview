import { Module } from '@nestjs/common';
import { DbConfigService } from './db-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
    }),
  ],
})
export class DbModule {}
