import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  films: Observable<any>;

  constructor(private router: Router, private http: HttpClient, public toastControler: ToastController) { }
  
  ngOnInit() {
    this.films = this.http.get('https://swapi.dev/api/films').pipe(catchError(erro => this.exibirErro(erro)))
  }

    async exibirErro(erro){
      const toast = await this.toastControler.create({
        message: 'Erro ao consultar a API:' + erro.status + ': ' + erro.message,
        duration: 4000,
        color: 'danger',
        position: 'middle'
      });
      console.log(erro);
      toast.present();
      return null;
    }


  openDetails(film) {
    let split = film.url.split('/');
    let filmId = split[split.length-2];
    this.router.navigateByUrl(`filme-detalhe/${filmId}`);
  }

}
