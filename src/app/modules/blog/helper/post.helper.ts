import { Injectable } from '@angular/core';

import * as marked from 'marked';
import { AjaxObservable } from 'rxjs/observable/dom/AjaxObservable';
@Injectable()
export class PostHelper {
  // static httpGet(theUrl) {
  //   const xmlHttp = new XMLHttpRequest();
  //   xmlHttp.open('GET', theUrl, false); // false for synchronous request
  //   xmlHttp.send(null);
  //   return xmlHttp.responseText;
  // }

  // static httpGetAsync(theUrl, callback) {
  //   const xmlHttp = new XMLHttpRequest();
  //   xmlHttp.onreadystatechange = function() {
  //     if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
  //       callback(xmlHttp.responseText);
  //     }
  //   };
  //   xmlHttp.open('GET', theUrl, true); // true for asynchronous
  //   xmlHttp.send(null);
  // }
  static fetchContent(url: string) {
    return AjaxObservable.create({
      method: 'GET',
      url,
      responseType: 'text',
      crossDomain: true
    }).map(res => res.response as string);
  }

  static AfterMarkdown(raw: string) {
    if (raw === undefined || raw === '') {
      return '';
    }

    return marked(this.prepare(raw));
  }

  static prepare(markdown: string) {
    let indentStart: number;
    return markdown
      .replace(/\&gt;/g, '>')
      .split('\n')
      .map((line: string) => {
        // find position of 1st non-whitespace character
        // to determine the markdown indentation start
        if (line.length > 0 && isNaN(indentStart)) {
          indentStart = line.search(/\S|$/);
        }
        // remove whitespaces before indentation start
        return indentStart ? line.substring(indentStart) : line;
      })
      .join('\n');
  }
}
