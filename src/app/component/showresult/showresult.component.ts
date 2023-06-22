import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from "src/app/core/api-service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import html2PDF from 'jspdf-html2canvas';

declare let $: any;
@Component({
  selector: 'app-showresult',
  templateUrl: './showresult.component.html',
  styleUrls: ['./showresult.component.scss']
})
export class ShowResultComponent implements OnInit {
  data: any;
  totalMax: number = 0;
  totalObtain: number = 0;
  pass: string;
  pageTitleText:string="Show Results";
  imageSrc:string='assets/images/result_banner.jpeg';
  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private uiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
  }
  enrollSearch = this.fb.group({
    enrollNumValue: ['', [Validators.required]]
  });
  /**
   * 
   */
  onSubmit() {
    console.log(this.enrollSearch.value);
    this.getAdmitCard(this.enrollSearch.value);
  }

  clickFunction(divName, name) {
    var printContents = document.getElementById(divName);
    html2PDF(printContents, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output: './' + name + '.pdf'
    });
  }
  /**
   * 
   * @param enrollNumber 
   */
  public getAdmitCard(enrollNumber: any) {
    this.uiLoaderService.start();
    let postData: any = {
      url: '/getUserDetails.php',
      params: {
        enrollmentNo: enrollNumber && enrollNumber.enrollNumValue ? enrollNumber.enrollNumValue : ''
      }
    }
    this.apiService.getApiData(postData).subscribe((res: any) => {
      this.uiLoaderService.stop();
      if (res && res.body && res.body.statusCode === 200) {
        if (res.body.result) {
          this.getResult(enrollNumber, res.body.result);
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
  public getResult(enrollNumber: any, userDetials: any) {
    this.uiLoaderService.start();
    let postData: any = {
      url: '/getResult.php',
      params: {
        enrollmentNo: enrollNumber && enrollNumber.enrollNumValue ? enrollNumber.enrollNumValue : ''
      }
    }
    this.apiService.getApiData(postData).subscribe((res: any) => {
      this.uiLoaderService.stop();
      if (res && res.body && res.body.statusCode === 200) {
        if (res.body.result && res.body.result.length > 0) {
          this.data = {
            userData: userDetials,
            results: res.body.result
          }
          this.calcTotal(res.body.result);
        }
        // console.log(this.data);
      }
    },
      (error) => {

      }
    );
  }
  public calcTotal(resultData) {
    this.totalMax = 0;
    this.totalObtain = 0
    resultData.forEach(result => {
      result.maxNo = Number(result.maxNo);
      result.totalNo = Number(result.totalNo)
      this.totalMax += result.maxNo;
      this.totalObtain += result.totalNo;
      if (result.resultStatus.toLowerCase() === 'pass') {
        this.pass = "Pass"
      }
      else {
        this.pass = "Fail";
      }
    });
  }
}