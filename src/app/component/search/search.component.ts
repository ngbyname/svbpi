import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  //Declare data storing variables
  data: any;
  router: any;
  events: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
 
  ) {
    //get request
    this.http.get('http://localhost:8888/admitCard.php').subscribe(data => {
      this.data = data;
    }, error => console.error(error));
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(search: string, from: string, to: string) {
    this.router.navigate(['recherche'], {
      queryParams: {
        search: search,
        from: from,
        to: to
      }
    });
  }


}