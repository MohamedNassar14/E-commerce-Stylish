import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {}

  delay:boolean = false
  ngOnInit(): void 
  {
    setTimeout(() => {
      this.delay = true;
    }, 1000);
  }

}
