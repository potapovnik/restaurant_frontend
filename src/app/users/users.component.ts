import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {Users} from './users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private userService: UsersService) {
  }

  user: Users;

  ngOnInit() {
    this.getUsersByid(1);
  }

  getUsersByid(id: number) {
    return this.userService.getUsersById(id).subscribe();
  }
}
