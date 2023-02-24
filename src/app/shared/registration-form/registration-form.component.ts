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
  course: CourseType[] = [
    { value: 'PMS', viewValue: 'PMS' },
    { value: 'VC', viewValue: 'VC' },
    { value: 'MGT', viewValue: 'MGT' },
  ];
  constructor(
    private fb: FormBuilder
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
      secondCtrl: ['', Validators.required],
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
  public personalDetailsFormData():void{
    console.log("personal Details",this.personalDetails.value);
  }
}
