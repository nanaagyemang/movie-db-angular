import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/model';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games: Array<Game> | undefined;

  constructor(
    private httpService : HttpService,
    private activatedRoute: ActivatedRoute
  ){}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
     this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
     
  }
  searchGames(sort: string, search?: string): void {
      this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  // openGameDetails(id: string): void {
  //   this.router.navigate(['details', id]);
  // }

  // ngOnDestroy(): void {
  //   if (this.games) {
  //     this.games.unsubscribe();
  //   }

  //   if (this.routeSub) {
  //     this.routeSub.unsubscribe();
  //   }
  // }

}
