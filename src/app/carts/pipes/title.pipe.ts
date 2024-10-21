import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(title:string): string {
    return title.split(' ').slice(0, 2).join(' ');
  }

}
