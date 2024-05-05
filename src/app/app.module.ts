import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmptyComponent } from './empty.component';
import { CircleForkComponent } from './chess-board/circle-fork/circle-fork.component';
import { GomokuComponent } from './chess-board/gomoku/gomoku.component';
import { ReversiComponent } from './chess-board/reversi/reversi.component';

const routeConfig: Routes = [
  {
    path: '',
    component: EmptyComponent,
  },
  {
    path: 'circle-fork',
    component: CircleForkComponent,
  },
  {
    path: 'gomoku',
    component: GomokuComponent,
  },
  {
    path: 'reversi',
    component: ReversiComponent,
  },
  {
    path: '**',
    component: EmptyComponent,
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routeConfig), HttpClientModule],
  exports: [RouterModule],
  declarations: [
    AppComponent,
    EmptyComponent,
    CircleForkComponent,
    GomokuComponent,
    ReversiComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
