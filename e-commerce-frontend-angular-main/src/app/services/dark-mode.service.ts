import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
 
  // toggleDarkTheme(): void{
  //   document.body.classList.toggle('dark-theme');
  // }
  
  toggleDarkTheme(): void {
    
   if (document.body.classList.contains('dark-theme')) {
     document.body.classList.remove('dark-theme')
     localStorage.setItem("theme", "light");
      } else {
        document.body.classList.add('dark-theme')
        localStorage.setItem("theme", "dark");
      }
  }
      
    

  constructor() { }
}
