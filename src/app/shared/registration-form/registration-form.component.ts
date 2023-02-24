import { DatePipe } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from "@angular/forms";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ApiService } from "src/app/core/api-service";
interface CourseType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  isLinear = false;
  personalDetails:FormGroup;
  subjectsDetails:FormGroup;
  selectedCourse: any;
  file: any;
  @ViewChild('fileInput') el: ElementRef;
  allowFiles=[".png", ".jpg",".jpeg"]
  course: CourseType[] = [
    { value: 'PMS', viewValue: 'PMS' },
    { value: 'VC', viewValue: 'VC' },
    { value: 'MGT', viewValue: 'MGT' },
  ];
  enrollmentNumber: string='';
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private apiService: ApiService,
    private uiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.personalDetails = this.fb.group({
      fullName: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
        lastName: ['', [Validators.required]]
      }),
      parentsDetails: this.fb.group({
        fatherName: ['', [Validators.required, Validators.minLength(2)]],
        motherName: ['', [Validators.required, Validators.minLength(2)]]
      }),
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dob: ['', [Validators.required]],
      courseName: ['', [Validators.required]],
      enrollmentNo: ['', [Validators.required]],
      centerCode: [{ value: '023', disabled: false }],
      session: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      gender: ['', [Validators.required]],
      image: [null]
    })
    this.subjectsDetails = this.fb.group({
      subjectName: ['', Validators.required],
      subjectCode: ['', Validators.required],
      enrollmentNumber: ['',Validators.required],
    })
  }
  /**
   * 
   * @param event 
   */
  public uploadFile(event: any):void{
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.personalDetails.get('image').setValue(file);
    }
    this.personalDetails.get('image')?.updateValueAndValidity
  }
  /**
   * 
   */
  public removeUploadedFile():void {
    let newFileList = Array.from(this.el.nativeElement.files);
    // this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    // this.editFile = true;
    // this.removeUpload = false;
    this.personalDetails.patchValue({
      file: [null]
    });
  }
  /**
   * 
   * @param event 
   */
  public changeCourse(event) {
    this.selectedCourse = event;
  }
  /**
   * 
   */
  public personalDetailsFormData():void{
    console.log("personal Details",this.personalDetails.value);
    let reqData:any;
    const enrollConst: String = 'SVBPI/';
    let currentMonth = (new Date().getMonth() + 1).toString()
    let enrollNum: any = ("" + Math.random()).substring(2, 8)
    let rollNo: any = ("" + Math.random()).substring(2, 9)
    let creationDate: any = new Date();
    creationDate = this.datePipe.transform(creationDate, 'yyyy-MM-dd');
    this.enrollmentNumber=enrollConst + currentMonth + this.selectedCourse + '/' + enrollNum;
    this.personalDetails.value.dob = this.datePipe.transform(this.personalDetails.value.dob, 'yyyy-MM-dd');
    reqData =
      {
        fullName: {
          firstName: this.personalDetails.value.fullName.firstName,
          lastName: this.personalDetails.value.fullName.lastName
        },
        parentsDetails: {
          fatherName: this.personalDetails.value.parentsDetails.fatherName,
          motherName: this.personalDetails.value.parentsDetails.motherName
        },
        email: this.personalDetails.value.email,
        dob: this.personalDetails.value.dob,
        courseName: this.personalDetails.value.courseName,
        centerCode: this.personalDetails.value.centerCode,
        session: this.personalDetails.value.session,
        phoneNumber: this.personalDetails.value.phoneNumber,
        gender: this.personalDetails.value.gender,
        creationDate: creationDate,
        rollNo: rollNo,
        enrollmentNo: this.enrollmentNumber,
        image: this.personalDetails.get('image').value
    }
    const formData = new FormData();
      for (let dataKey in reqData) {
        if (dataKey === 'fullName' || dataKey === 'parentsDetails') {
          // append nested object
          for (let previewKey in reqData[dataKey]) {
            formData.append(dataKey + `[${previewKey}]`, reqData[dataKey][previewKey]);
          }
        }
        else {
          formData.append(dataKey, reqData[dataKey]);
        }
      }
      this.subjectsDetails.patchValue({
        enrollmentNumber:this.enrollmentNumber
      })
      // this.subjectsDetails.get('enrollmentNumber').setValue(this.enrollmentNumber);
      this.subjectsDetails.get('enrollmentNumber')?.updateValueAndValidity();
      this.subjectsDetails.controls['enrollmentNumber'].disable();
      this.callApiForPersonalDetailsInsert(formData);
  }
  /**
   * Method for Handle data
   * @param requestData
   */
  public callApiForPersonalDetailsInsert(requestData:any):void{
    let postData:any={
      url:'/addUser.php',
      data:requestData
    }
    this.uiLoaderService.start();
    this.apiService.postApiData(postData).subscribe((res:any)=>{
      this.uiLoaderService.stop();
      if(res && res.body && res.body.statusCode == 200){
        console.log(res.body.msg ? res.body.msg : '');
      }
      else{
        console.log("not200")
      }
    },
    (error:any)=>{
      this.uiLoaderService.stop();
      console.log("error",error)
    }
    )
  }
  public isPersoanlFormBtnDisable():boolean{
    let isDisable:boolean=true;
    if(this.personalDetails.valid){
      isDisable = false;
    }
    return isDisable;
  }
  public disableEnableClass(formData:FormGroup):string{
    let className:string='disable-btn';
    if(formData.valid){
      className = '';
    }
    return className
  }
}
