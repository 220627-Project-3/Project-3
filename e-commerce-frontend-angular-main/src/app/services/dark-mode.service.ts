import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  
  toggleDarkTheme(): void{
    document.body.classList.toggle('dark-theme');
  }
  constructor() { }
}
