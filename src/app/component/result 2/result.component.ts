import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  submitted = false;
  // registrationForm:FormGroup
  // City names
  // City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private http:HttpClient,
    private formBuilder:FormBuilder
  ) { }
  /*##################### Registration Form #####################*/
  registrationForm = this.fb.group({
    lessons: this.fb.array([]),
    // file: [null],
    fullName: this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      lastName: ['', [Validators.required]]
    }),
    parentsDetails: this.fb.group({
      fatherName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      motherName: ['', [Validators.required]]
    }),
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    dob: ['', [Validators.required]],
    courseName: ['', [Validators.required]],
    enrollmentNo: ['', [Validators.required]],
    centerCode: ['', [Validators.required]],
    session: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    // address: this.fb.group({
    //   street: ['', [Validators.required]],
    //   city: ['', [Validators.required]],
    //   cityName: ['', [Validators.required]]
    // }),
    gender: ['male'],
    // PasswordValidation: this.fb.group({
    //   password: ['', Validators.required],
    //   confirmPassword: ['', Validators.required]
    // },{
    //   validator: ValidatePassword.MatchPassword // your validation method
    // }
    // ),
    // addDynamicElement: this.fb.array([])
  })  

  /*########################## File Upload ########################*/
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
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
  // get myForm() {
  //   return this.registrationForm.controls;
  // }
  
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
get f() { return this.registrationForm.controls; }


  // Submit Registration Form
  onSubmit() {
    this.submitted = true;
    console.log(this.registrationForm.value)
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      console.log(this.registrationForm.value)
      var myFormData = new FormData();
      myFormData.append('firstName', this.registrationForm.value.firstName);
      myFormData.append('lastName', this.registrationForm.value.lastName);
      myFormData.append('fatherName', this.registrationForm.value.fatherName);
      myFormData.append('motherName', this.registrationForm.value.motherName);
      myFormData.append('dob', this.registrationForm.value.dob);
      myFormData.append('courseName', this.registrationForm.value.courseName);
      myFormData.append('centerCode', this.registrationForm.value.centerCode);
      myFormData.append('session', this.registrationForm.value.session);
      myFormData.append('phoneNumber', this.registrationForm.value.phoneNumber);
      myFormData.append('email', this.registrationForm.value.email);
      myFormData.append('gender', this.registrationForm.value.gender);
      //Need to add for enrollmentNo

      //Post Request
      return this.http.post('http://localhost:8888/addUser.php',myFormData).subscribe((res:Response) =>{
        //sweetalert message popup
        Swal.fire({
          title:'Hurray!!',
          text:this.registrationForm.value.firstName+" has been added successfully",
          icon:'success'
        }

        );
      }

      );
    }
  }
  get lessons() {
    return this.registrationForm.controls["lessons"] as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['', Validators.required]
    });
    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }
  ngOnInit(): void {
  }
}
