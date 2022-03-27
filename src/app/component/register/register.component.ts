import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/core/api-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

interface CourseType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe]
})
export class RegisterComponent implements OnInit {
  submitted = false;
  srcResult: any;
  selectedCourse: any;
  file: any;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private apiService: ApiService,
    private uiLoaderService: NgxUiLoaderService
  ) { }
  course: CourseType[] = [
    { value: 'PMS', viewValue: 'PMS' },
    { value: 'VC', viewValue: 'VC' },
    { value: 'MGT', viewValue: 'MGT' },
  ];
  /*##################### Registration Form #####################*/
  registrationForm = this.fb.group({
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
    centerCode: [{ value: '023', disabled: true }],
    session: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    gender: ['', [Validators.required]],
    image: [null]
  })

  /*########################## File Upload ########################*/
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event: any) {
    // const file = event.target.files ? event.target.files[0] : '';
    // console.log(file);
    // this.registrationForm.patchValue({
    //   image: file
    // });

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registrationForm.get('image').setValue(file);
    }
    this.registrationForm.get('image')?.updateValueAndValidity
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }

  // Getter method to access formcontrols
  get myForm() {
    return this.registrationForm.controls;
  }

  // Choose city using select dropdown
  // changeCity(e) {
  //   this.registrationForm.get('address.cityName').setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }

  /*############### Add Dynamic Elements ###############*/
  // get addDynamicElement() {
  //   return this.registrationForm.get('addDynamicElement') as FormArray
  // }

  // addSuperPowers() {
  //   this.addDynamicElement.push(this.fb.control(''))
  // }

  //Add user form actions
  get sendDataToServer() { return this.registrationForm.controls; }


  // Submit Registration Form
  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      let reqData: any;
      const enrollConst: String = 'SVBPI/';
      let currentMonth = (new Date().getMonth() + 1).toString()
      let enrollNum: any = ("" + Math.random()).substring(2, 8)
      let rollNo: any = ("" + Math.random()).substring(2, 9)
      let creationDate: any = new Date();
      creationDate = this.datePipe.transform(creationDate, 'yyyy-MM-dd');
      let enrollmentNo: any;
      this.registrationForm.value.dob = this.datePipe.transform(this.registrationForm.value.dob, 'yyyy-MM-dd');
      reqData =
      {
        lessons: this.registrationForm.value.lessons,
        fullName: {
          firstName: this.registrationForm.value.fullName.firstName,
          lastName: this.registrationForm.value.fullName.lastName
        },
        parentsDetails: {
          fatherName: this.registrationForm.value.parentsDetails.fatherName,
          motherName: this.registrationForm.value.parentsDetails.motherName
        },
        email: this.registrationForm.value.email,
        dob: this.registrationForm.value.dob,
        courseName: this.registrationForm.value.courseName,
        centerCode: this.registrationForm.value.centerCode,
        session: this.registrationForm.value.session,
        phoneNumber: this.registrationForm.value.phoneNumber,
        gender: this.registrationForm.value.gender,
        creationDate: creationDate,
        rollNo: rollNo,
        enrollmentNo: enrollConst + currentMonth + this.selectedCourse + '/' + enrollNum,
        image: this.registrationForm.get('image').value
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

      //Post Request
      this.insertPersonalDetails(formData);
      //console.log(formData);
    }
  }
  /**
   * 
   * @param reqData 
   */
  public insertPersonalDetails(reqData) {
    this.uiLoaderService.start();
    let postData: any = {
      url: '/addUser.php',
      data: reqData
    }
    this.apiService.postApiData(postData).subscribe((res: any) => {
      this.uiLoaderService.stop();
      if (res && res.body && res.body.statusCode == 200) {
        Swal.fire({
          title: 'Hurray!!',
          text: res.body.msg ? res.body.msg : '',
          icon: 'success'
        }
        );
      }
      else {
        Swal.fire({
          title: 'Aah!!',
          text: res.body.msg ? res.body.msg : '',
          icon: 'error'
        }
        );
      }
    },
      (error) => {
        Swal.fire({
          title: 'Aah!!',
          text: error,
          icon: 'error'
        }
        );
      }
    );

  }
  get lessons() {
    return this.registrationForm.controls["lessons"] as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      subCode: ['', Validators.required],
      subName: ['', Validators.required]
    });
    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }
  changeCourse(event) {
    this.selectedCourse = event;
  }
  ngOnInit(): void {

  }
}
