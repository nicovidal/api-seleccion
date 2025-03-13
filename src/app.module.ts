import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroserviceModule } from './microservice/microservice.module';
import { ObtencionDataModule } from './obtencion-data/obtencion-data.module';

@Module({
  imports: [MicroserviceModule, ObtencionDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
