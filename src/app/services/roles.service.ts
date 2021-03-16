import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private htpp: HttpClient) { }
  private API_URI = API_URI.url;

  getRoles(token: any){
    let headers = new HttpHeaders({'x-token': token});
    return this.htpp.get(`${this.API_URI}/roles/list`, {'headers':headers});
  }
}
