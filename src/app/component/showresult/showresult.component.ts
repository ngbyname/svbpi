import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from "src/app/core/api-service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
declare let $: any;
@Component({
  selector: 'app-showresult',
  templateUrl: './showresult.component.html',
  styleUrls: ['./showresult.component.scss']
})
export class ShowResultComponent implements OnInit {
  data: any;
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
          this.getSubject(enrollNumber, res.body.result);
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
  public getSubject(enrollNumber, userDetials) {
    this.uiLoaderService.start();
    let postData: any = {
      url: '/getSubjects.php',
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
            subjectDeatils: res.body.result
          }
        }
        console.log(this.data);
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
  public getResult(enrollNumber) {
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
            resultDetails: res.body.result
          }
        }
        console.log(this.data);
      }
    }, (error) => {

    }
    );
  }
}