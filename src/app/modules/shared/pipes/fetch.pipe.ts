import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fetch',
  pure: false
})
export class FetchPipe implements PipeTransform {

  private cachedData: any = '';
  private cachedUrl = '';
  constructor(private http: HttpClient) { }

  transform(url: string): any {
    if (url === '' || url === undefined) {
      return '';
    }

    if (url !== this.cachedUrl) {
      this.cachedData = null;
      this.cachedUrl = url;
      this.http.get(url, { responseType: 'text' })
        .subscribe(result =>
          this.cachedData = result);
    }
    return this.cachedData;
  }

}
