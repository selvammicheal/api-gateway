import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  import { ErrCodes } from './err-codes.enum';
  
  @Catch()
  export class CustomExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: any, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();
   
      
  
          let responseBody = {};
          let httpStatus = 500;
          if(exception.exception_name == 'BadRequestException'){
            httpStatus = 201;
             responseBody = {
              code: ErrCodes.BAD_PARAMETERS,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(ctx.getRequest()),
              errors: [exception.errorDetails.response.message],
              errorDetails: exception.errorDetails,
              exception_name: exception.exception_name,
            };
          }
          
          else if(exception.name == 'BadRequestException'){
            
            httpStatus = 400;
             responseBody = {
              code: exception.status,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(ctx.getRequest()),
              errors: [exception.response.message],
              errorDetails: null,
              exception_name: exception.name,
            };
          }
          else if(exception.name == 'ForbiddenException'){
            
            httpStatus = 403;
             responseBody = {
              code: exception.status,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(ctx.getRequest()),
              errors: [exception.response.message],
              errorDetails: null,
              exception_name: exception.name,
            };
          }
  
          
          else{
            responseBody = {
              statusCode: httpStatus,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(ctx.getRequest()),
              errors: exception.errors,
              errorDetails: exception.errorDetails,
              exception_name: exception.exception_name,
            };
          }
  
      
  
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }