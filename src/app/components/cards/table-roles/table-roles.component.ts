import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject } from 'rxjs';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-table-roles',
  templateUrl: './table-roles.component.html',
  styles: [
  ]
})
export class TableRolesComponent implements OnDestroy, OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private dtOptions: DataTables.Settings = {};
  private dtTrigger: Subject<any> = new Subject<any>();
  private _color = "light";
  private role: any = [];
  constructor(private roleServie: RolesService, private recpatchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {
    this.dtOptions = {
      processing: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      },
      destroy: true
    }
    this.recpatchaV3Service.execute('action').subscribe(
      (token)=>{
        this.getRoles(token)
      }
    )
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  

  getRoles(token:any){
    this.roleServie.getRoles(token).subscribe(
      (data: any)=>{
        this.role  = data;
        this.dtTrigger.next();
      }
    )
  }

}
