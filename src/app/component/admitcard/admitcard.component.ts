import { Component } from "@angular/core";
declare let $: any;
@Component({
  selector: 'app-admitcard',
  templateUrl: './admitcard.component.html',
  styleUrls: ['./admitcard.component.scss']
})
export class AdmitcardComponent {
  //For modal popup hiding first time
showuser = false;
  http: any;
  userdata:any;
  data:any;
  openuser(id: string | Blob)
{
    // Initialize Params Object
    var myFormData = new FormData();
    //removing modal hiding
    this.showuser = true;
  // Begin assigning parameters
  
  myFormData.append('userid', id);
  
  //user details post request
  return this.http.post('http://localhost:8888/admitCard.php/'
    , myFormData).subscribe((res: Response) => {
      this.userdata = res[0];
      
      $("#myModal").modal("show");
      
    });
}
}