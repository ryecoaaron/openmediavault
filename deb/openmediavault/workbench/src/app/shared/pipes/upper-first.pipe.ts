import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'upperFirst'
})
export class UpperFirstPipe implements PipeTransform {
  transform(text: string): string {
    return _.upperFirst(text);
  }
}
