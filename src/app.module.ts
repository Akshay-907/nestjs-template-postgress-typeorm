import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './modules/application-settings/configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Initialize TypeORM with the configuration
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
