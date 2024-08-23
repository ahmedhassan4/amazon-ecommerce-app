import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordTrim'
})
export class WordTrimPipe implements PipeTransform {
  
  transform(value: string, wordLimit: number): string {
    if (!value) return '';
    const words = value.split(' ');
    if (words.length <= wordLimit) return value;
    return words.slice(0, wordLimit).join(' ') + '...';
  }
}
