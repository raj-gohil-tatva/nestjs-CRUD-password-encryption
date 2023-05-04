import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use global validation pipe to validate the incoming data from the APIs.
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * whitelist option is used to whitelist or allow only properties that are defined in the DTO (Data Transfer Object) 
       * class to be received in the request payload.

       * By default, if a request payload contains properties that are not defined in the DTO class, 
         NestJS will reject the payload and throw an error. By enabling the whitelist option, 
         NestJS will automatically filter out any properties that are not defined in the DTO class.

       * This helps to prevent unexpected or malicious data from being processed 
         by the application and improves the security and reliability of the API. 
         It is recommended to always enable this option for API endpoints that receive data from external sources.
       */
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
