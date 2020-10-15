import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageboxService, MessageBoxType } from 'src/app/services/messagebox.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  frmLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });
  constructor(private messageBox: MessageboxService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.messageBox.show('Teste de msg Teste de msg Teste de msg Teste de msg Teste de msg Teste de msg Teste de msg Teste de msg', 'CMGGYN', MessageBoxType.Question);
  }

}
