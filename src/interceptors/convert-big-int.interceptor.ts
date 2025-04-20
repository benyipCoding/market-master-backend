import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ConvertBigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.convertBigIntToString(data);
      }),
    );
  }

  private convertBigIntToString(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertBigIntToString(item));
    } else if (obj !== null && typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (typeof value === 'bigint') {
            newObj[key] = value.toString();
          } else if (typeof value === 'object') {
            newObj[key] = this.convertBigIntToString(value);
          } else {
            newObj[key] = value;
          }
        }
      }
      return newObj;
    } else {
      return obj;
    }
  }
}
