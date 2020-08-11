import { Component, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ';
  data$: Observable<any>;

  myData: any;

  constructor(public http: HttpClient) {
   
  }

  load(){
       this.data$ = this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
        //tap(console.log),
        shareReplay(1)
        //tap(() => console.log('after sharing'))
      );
  }

  getData() {
    console.log(this.data$);
    if(this.data$ == undefined){
      this.load();
    }
    this.data$.subscribe(data => this.myData = data);
  }

  clearData() {
    this.myData = null;
  }
}
