import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  // constructor(private schema: ObjectSchema) {}
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;
    console.log(value);
    const obj = plainToClass(metatype, value);
    const errors = await validate(obj);
    if (errors.length > 0) {
      console.log(errors);
      throw new BadRequestException('Validate Failure');
    }
    return value;
  }
  toValidate(metatype: Function): Boolean {
    const types: Function[] = [String, Number];
    return !types.includes(metatype);
  }
}
