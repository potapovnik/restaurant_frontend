import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {Users} from './users';
import {Role} from '../utils/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  chosedUser: Users;
  createdUser: Users;
  allUsers: Users[];
  allRoles: Role[];

  constructor(private userService: UsersService) {
  }


  ngOnInit() {
    this.chosedUser = new Users();
    this.createdUser = new Users();
    this.getAllUsers();
    this.getAllRoles();
  }

  getUsersByid(id: number) {
    return this.userService.getUsersById(id).subscribe();
  }

  getAllUsers() {
    return this.userService.getAllUsers().subscribe(resp => this.allUsers = resp);
  }

  chooseUser(user: Users) {
    this.chosedUser = user;
  }

  deleteUser(id: number) {
    this.userService.deleteUserById(id).subscribe();
    return this.userService.getAllUsers().subscribe(resp => this.allUsers = resp);
  }

  saveUser(user: Users) {
    return this.userService.update(user).subscribe();
  }

  createUser(user: Users) {
    return this.userService.create(user).subscribe();
  }

  cancel() {
    this.createdUser = new Users();
  }

  getAllRoles() {
    return this.userService.getAllRole().subscribe(resp => this.allRoles = resp);
  }
}
