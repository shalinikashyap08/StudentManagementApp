import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';  
import { CrudService } from '../shared/crud.service';
@Component({
  selector: 'app-bulkupdate',
  templateUrl: './bulkupdate.component.html',
  styleUrls: ['./bulkupdate.component.scss']
})
export class BulkupdateComponent implements OnInit {
  workBook:any;
  products:any;
  initial:any;
  product:any;
  name:any;
  obj={$key:"",firstName:"",lastName:"",email:"",mobileNumber:11};
  constructor(public crudApi: CrudService) { }

  ngOnInit(): void {
  }
  uploadExcel(e:any) {
  
    try{
    
    const fileName = e.target.files[0].name;
    
    import('xlsx').then(xlsx => {
      let jsonData = null;
      const reader = new FileReader();
      // const file = ev.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        this.workBook = xlsx.read(data, { type: 'binary' });
        jsonData = this.workBook.SheetNames.reduce((initial:any, name:any) => {
          const sheet = this.workBook.Sheets[name];
          initial[name] = xlsx.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.products = jsonData[Object.keys(jsonData)[0]];
        console.log(this.products);
        this.products.forEach(element => {
          console.log(element);
          this.obj["firstName"]=element.firstName;
          this.obj["lastName"]=element.lastName;
          this.obj["email"]=element.email;
          this.obj["mobileNumber"]=element.mobileNumber;
          console.log(this.obj);
          this.crudApi.AddStudent(this.obj);
        });
      };
      reader.readAsBinaryString(e.target.files[0]);
    });
  
  }catch(e){
     console.log('error', e);
  }
  
  }

}
