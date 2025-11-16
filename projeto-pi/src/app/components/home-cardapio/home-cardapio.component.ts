import { Component } from '@angular/core';
import { FooterComponent } from "../home/footer/footer.component";
import { HeaderComponent } from "../home/header/header.component";
import { MainCardapioComponent } from "./main-cardapio/main-cardapio.component";

@Component({
  selector: 'app-home-cardapio',
  imports: [FooterComponent, HeaderComponent, MainCardapioComponent],
  templateUrl: './home-cardapio.component.html',
  styleUrl: './home-cardapio.component.css'
})
export class HomeCardapioComponent {

}
