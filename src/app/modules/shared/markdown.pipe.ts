import { Pipe, PipeTransform } from '@angular/core';
import { MarkedOptions } from 'marked';
import * as marked from 'marked';
@Pipe({
  name: 'markdown'
  // , pure: false
})
export class MarkdownPipe implements PipeTransform {

  private cachedData: any = '';
  private cachedUrl = '';

  transform(markdown: string, options?: MarkedOptions): string {
    if (markdown == null) {
      return '';
    }
    return marked(this.prepare(markdown));
  }

  setOptions(options: MarkedOptions): void {
    marked.setOptions(options);
  }
  prepare(raw: string) {
    if (!raw) {
      return '';
    }
    let indentStart: number;
    return raw
      .replace(/\&gt;/g, '>')
      .split('\n')
      .map((line: string) => {
        // find position of 1st non-whitespace character
        // to determine the markdown indentation start
        if (line.length > 0 && isNaN(indentStart)) {
          indentStart = line.search(/\S|$/);
        }
        // remove whitespaces before indentation start
        return indentStart
          ? line.substring(indentStart)
          : line;
      }).join('\n');
  }

}
