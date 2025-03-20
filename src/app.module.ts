import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroserviceModule } from './microservice/microservice.module';
import { ObtencionDataModule } from './obtencion-data/obtencion-data.module';
import { SeleccionModule } from './seleccion/seleccion.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MicroserviceModule, ObtencionDataModule, SeleccionModule,    ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
