import { Pipe, PipeTransform } from '@angular/core';
import { MarkedOptions } from 'marked';
import * as marked from 'marked';
@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {


  transform(markdown: string, options?: MarkedOptions): string {
    if (markdown == null) return '';
    let res = marked(markdown, options);
    return res;
  }

  static setOptions(options: MarkedOptions): void {
    marked.setOptions(options);
  }
}