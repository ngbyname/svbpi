import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from "src/app/core/api-service";
import { FormGroup, FormControl ,FormBuilder,Validators} from '@angular/forms';
import html2PDF from 'jspdf-html2canvas';

declare let $: any;
@Component({
  selector: 'app-admitcard',
  templateUrl: './admitcard.component.html',
  styleUrls: ['./admitcard.component.scss']
})
export class AdmitcardComponent implements OnInit {
  data:any;
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
  clickFunction(divName,name) {
    var printContents = document.getElementById(divName);
    html2PDF(printContents, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output: './'+name+'.pdf'
    });
  }
  /**
   * 
   * @param enrollNumber 
   */
   public getAdmitCard(enrollNumber:any) {
    this.uiLoaderService.start();
    let postData: any = {
      url: '/getUserDetails.php',
      params:{
        enrollmentNo:enrollNumber && enrollNumber.enrollNumValue?enrollNumber.enrollNumValue:''
      } 
    }
    this.apiService.getApiData(postData).subscribe((res: any) => {
      this.uiLoaderService.stop();
      if (res && res.body && res.body.statusCode === 200) {
        if(res.body.result){
          this.getSubject(enrollNumber,res.body.result);
        }
      }
    },
      (error) => {
        
      }
    );
  }
  /**
   * 
   * @param enrollNumber 
   */
  public getSubject(enrollNumber,userDetials){
    this.uiLoaderService.start();
    let postData: any = {
      url: '/getSubjects.php',
      params:{
        enrollmentNo:enrollNumber && enrollNumber.enrollNumValue?enrollNumber.enrollNumValue:''
      } 
    }
    this.apiService.getApiData(postData).subscribe((res: any) => {
      this.uiLoaderService.stop();
      if (res && res.body && res.body.statusCode === 200) {
        if(res.body.result && res.body.result.length>0){
          this.data = {
            userData:userDetials,
            subjectDeatils:res.body.result
          }
        }
        console.log(this.data);
      }
    },
      (error) => {
        
      }
    );
  }
}