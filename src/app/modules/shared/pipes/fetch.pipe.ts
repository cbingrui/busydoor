import { Http } from '@angular/http';
import { Pipe, PipeTransform } from '@angular/core';
import 'rxjs/add/operator/map';

@Pipe({
  name: 'fetch',
  pure: false
})
export class FetchPipe implements PipeTransform {

  private cachedData: any = '';
  private cachedUrl = '';
  constructor(private http: Http) { }

  transform(url: string): any {
    if (url === '' || url === undefined) {
      return '';
    }

    if (url !== this.cachedUrl) {
      this.cachedData = null;
      this.cachedUrl = url;
      this.http.get(url)
        .map(res => res.text() || '')
        .subscribe(result =>
          this.cachedData = result);
    }
    return this.cachedData;
  }

}
