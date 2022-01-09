import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sig-up',
  templateUrl: './sig-up.component.html',
  styleUrls: ['./sig-up.component.css']
})
export class SigUpComponent implements OnInit {

  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  registerForm = new FormGroup({
    Username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

}
