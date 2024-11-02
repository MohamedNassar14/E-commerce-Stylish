import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutTitle'
})
export class CutTitlePipe implements PipeTransform {

  transform(title:string): string {
    return title.split(' ').slice(0, 1).join(' ');
  }

}
