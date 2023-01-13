import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BadGatewayException } from '@nestjs/common/exceptions';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new BadGatewayException(`${value} is not a valid MongoID`);
    }
    return value;
  }
}
