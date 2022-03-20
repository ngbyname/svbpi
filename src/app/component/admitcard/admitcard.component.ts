import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from "src/app/core/api-service";
import { FormGroup, FormControl ,FormBuilder,Validators} from '@angular/forms';
declare let $: any;
@Component({
  selector: 'app-admitcard',
  templateUrl: './admitcard.component.html',
  styleUrls: ['./admitcard.component.scss']
})
export class AdmitcardComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private uiLoaderService: NgxUiLoaderService
  ) { }
  ngOnInit(): void {
  }
  enrollSearch =this.fb.group({
    enrollNumValue:['',[Validators.required]]
  });
  /**
   * 
   */
  onSubmit(){
    console.log(this.enrollSearch.value);
    this.getAdmitCard(this.enrollSearch.value);
  }
  /**
   * 
   * @param enrollNumber 
   */
   public getAdmitCard(enrollNumber:any) {
    this.uiLoaderService.start();
    let postData: any = {
      url: '/getResult.php',
      params:{
        enrollmentNo:enrollNumber && enrollNumber.enrollNumValue?enrollNumber.enrollNumValue:''
      } 
    }
    this.apiService.getApiData(postData).subscribe((res: any) => {
      this.uiLoaderService.stop();
      if (res && res.data && res.data.statusCode == 200) {
       
      }
    },
      (error) => {
        
      }
    );

  }
}