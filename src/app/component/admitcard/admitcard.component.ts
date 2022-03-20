import { Component } from "@angular/core";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from "src/app/core/api-service";
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
  userdata: any;
  data: any;
  private uiLoaderService: NgxUiLoaderService;
  private apiService:ApiService
  openuser(id: string | Blob) {
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
  onSubmit() {
    let input: any;
    input = (<HTMLInputElement>document.getElementById("input_search")).value;
    console.log(input);
    //GET Request
    // this.fetchAdmitCard(input);

  }

  /**
  * 
  * @param input 
  */
  // public fetchAdmitCard(input) {
  //   this.uiLoaderService.start();
  //   let getData: any{
  //     url:'/admitCard.php',
  //     data: input
  //   }
  //   this.apiService.getApiData(input).subscribe(res:any)=>{
  //     this.uiLoaderService.stop();
  //     if (res && res.data && res.data.statusCode == 200) {
  //       Swal.fire({
  //         title: 'Hurray!!',
  //         text: res.data.msg?res.data.msg:'',
  //         icon: 'success'
  //       }
  //       );
  //     }
  //   }

  // }
}