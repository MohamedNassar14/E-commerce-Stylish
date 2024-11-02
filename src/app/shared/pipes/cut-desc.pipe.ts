import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutDesc'
})
export class CutDescPipe implements PipeTransform {

  transform(description:string): string {
    return description.split(' ').slice(0, 8).join(' ');
  }

}
