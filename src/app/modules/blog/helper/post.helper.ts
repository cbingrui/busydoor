import { Injectable } from '@angular/core';
import * as marked from 'marked';
@Injectable()
export class PostHelper {



    AfterMarkdown(raw: string) {
        if (raw === undefined || raw === '') {
            return '';
        }


        return marked(this.prepare(raw));
    }

    prepare(markdown: string) {
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
                return indentStart
                    ? line.substring(indentStart)
                    : line;
            }).join('\n');

    }

}

