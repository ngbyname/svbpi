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
import { CLASS_NAME } from "@angular/flex-layout";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { stringify } from "querystring";
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
  // marksDetails:FormGroup;
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
  theoryNum: number;
  practicleNumber: number;
  hobbiesArray = new FormArray([new FormControl('',Validators.required)]);
  subjectForm= new FormGroup(
    {
      subjectsName: new FormArray([new FormControl('',Validators.required)]),
      subjectsCode: new FormArray([new FormControl('',Validators.required)]),
  });
  subjectDetailsValue: any;
  
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private apiService: ApiService,
    private uiLoaderService: NgxUiLoaderService
  ) { }
  marksDetails = this.fb.group({
    marksList: this.fb.array([this.createMarksForm('')])
  })
  addInputControl(){
    this.hobbiesArray.push(new FormControl('',Validators.required))
  }
  get subjectsName(): FormArray {
    return this.subjectForm.get('subjectsName') as FormArray;
  }
  get subjectsCode(): FormArray {
    return this.subjectForm.get('subjectsCode') as FormArray;
  }
  addSubject() {
    this.subjectsName.push(new FormControl());
    this.subjectsCode.push(new FormControl());
  }
  ngOnInit(): void {
    this.personalDetails = this.fb.group({
      fullName: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
        lastName: ['']
      }),
      parentsDetails: this.fb.group({
        fatherName: ['', [Validators.required, Validators.minLength(2)]],
        motherName: ['']
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
  }
  get marksList(){
    return (this.marksDetails.get('marksList') as FormArray);
  }
  createMarksForm(val):FormGroup{
    return this.fb.group({
      marksSubjectName: [val.subject, Validators.required],
      marksSubjectCode: [val.subjectCode, Validators.required],
      maxNumber: ['100', Validators.required],
      theoryNumber: ['', Validators.required],
      practicleNumber: ['', Validators.required],
      totalNumber: ['', Validators.required],
      resultStatus: ['', Validators.required],
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
  public subjectDetailsFormData():void{
    console.log("subject details", this.subjectForm.value);
    if(this.subjectForm && this.subjectForm.value && this.subjectForm.value.subjectsName && this.subjectForm.value.subjectsName.length >0){
      this.addSubjectForMarks(this.subjectForm);
    }
  }
  /**
   * 
   * @param subjectData 
   */
  public addSubjectForMarks(subjectData:any):void{
    let subjectDetails:any =[];
    subjectData.value.subjectsName.forEach((subVal:any,index)=>{
      subjectDetails.push({
        subject:subVal,
        subjectCode:subjectData.value.subjectsCode[index],
        enrollmentNo:this.enrollmentNumber
      });
    });
    this.subjectDeatilsApiCall(subjectDetails);
    subjectDetails.forEach((val)=>{
      this.marksList.push(this.createMarksForm(val));
    })
    // subjectData.value.subjectsCode.forEach((subVal:any)=>{
    //   subjectCodes.push({subjectsCode:subVal});
    // });
    // subjcetNames.forEach((item,index)=>{
    //   subjectDetails.push({subjectsName})
    // })
    // let subjectDetails =[...subjcetNames, ...subjectCodes];
    console.log(subjectDetails)
  }
  /**
   * 
   * @param reqObject 
   */
  public subjectDeatilsApiCall(reqObject:any){
    let postReq:any={
      url:'/addSubject.php',
      data:reqObject
    }
    this.uiLoaderService.start();
    this.apiService.postApiData(postReq).subscribe((res)=>{
      if(res && res.body){
        console.log(res);
      }
    },
    (error)=>{
      console.log(error);
    })
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
  // public updateTotalNum(event:any,typeOfNumber:string,index:any){
  //   let totalNumb:any = 0;
  //   if(typeOfNumber === 'theoryNumber'){
  //      this.theoryNum = parseInt(event.target.value);
  //   }
  //   else{
  //     this.practicleNumber = parseInt(event.target.value);
  //   }
  //   totalNumb = this.theoryNum + this.practicleNumber;
  //   totalNumb = totalNumb.toString();
  //   console.log(totalNumb);
  // }

  updateTotal(city: FormGroup) {
    let totalValue = city.controls.theoryNumber.value + city.controls.practicleNumber.value;
    city.controls['totalNumber'].patchValue(totalValue);
    // let totalNumber = city.controls.totalNumber.value ?city.controls.totalNumber.value.parseInt():0;
    if(totalValue > 30){
      city.controls['resultStatus'].patchValue("Pass");
    }
    else{
      city.controls['resultStatus'].patchValue("Fail");
    }
  }
  public marksDetailsFormData(){
    console.log(this.marksDetails);
    let marksValue:any=[];
    marksValue = marksValue.concat(this.marksDetails.value.marksList);
    marksValue = marksValue.filter(value=> value.marksSubjectName && value.marksSubjectName.length>0);
    let requsetArry:any=[];
    marksValue.forEach(val=>{
        let newObject:any={
          enrollmentNo: this.enrollmentNumber,
          subject:val.marksSubjectName,
          subjectCode:val.marksSubjectCode,
          maxNo:val.maxNumber,
          theoryNo:val.theoryNumber,
          practicalNo:val.practicleNumber,
          totalNo:val.totalNumber,
          resultStatus:val.resultStatus,
        }
        requsetArry.push(newObject);
      }
    );
    this.callApiForMarksDetailsInsert(requsetArry);
  }
  /**
   * Method for Handle data
   * @param requestData
   */
   public callApiForMarksDetailsInsert(requestData:any):void{
    let postData:any={
      url:'/addResult.php',
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
  public formReset(){
    this.subjectForm.reset();
    this.marksDetails.reset();
  }
}
