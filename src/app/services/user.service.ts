import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<{
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
  }>;

  currentUser: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
  };

  constructor(private http: HttpClient) { }

  getUsers() {
    this.loadUser().subscribe(res=>{
      this.users = res;
    });
  }

  validateUser(email, password): boolean {
    let login = false;

    for (let index = 0; index < this.users.length && !login; index++) {
      const element = this.users[index];

      if(element.email === email && element.password === password){
        login = true;
        this.currentUser = element;
      }
    }
    return login;
  }

  createNewUser(name: string, lastname: string, email: string, password: string) {
    console.log(this.users);

    const newUser = {
      id: this.users.length + 1,
      name: '' + name,
      lastname: '' + lastname,
      email: '' + email,
      password: '' + password,
    };

    this.users.push(newUser);
  }

  private loadUser() {
    return this.http.
    get('../../../assets/files/users.json').
    pipe(
      map((res: any) =>res.users)
    );
  }

  private saveUsers() {
    this.http.post('../../../assets/files/users.json', this.users).subscribe(data=> {
      console.log('../../../assets/files/users.json');
    }, error => {
      console.log(error);
    }
    );
  }
}
