import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BannerHomeComponent } from './banner-home/banner-home.component';
import { CardSaboresComponent } from './card-sabores/card-sabores.component';
import { SobreComponent } from './sobre/sobre.component';
import { FuncionamentoComponent } from './funcionamento/funcionamento.component'
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    BannerHomeComponent,
    CardSaboresComponent,
    SobreComponent,
    FuncionamentoComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
