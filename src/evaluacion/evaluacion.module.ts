import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { ObtencionDataModule } from 'src/obtencion-data/obtencion-data.module';

@Module({
  imports:[ObtencionDataModule],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
})
export class EvaluacionModule {}
