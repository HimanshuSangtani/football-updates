import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FootballDataService {
  private apiUrl = ' https://v3.football.api-sports.io/';

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders()
    .set('x-rapidapi-key', '3c73e3752dce0b1dff8fefd7d9965d3e')
    .set('x-rapidapi-host', 'v3.football.api-sports.io');

  requestOptions = {
    headers: this.headers,
  };
  getStandings(leagueId: number): Observable<any> {
    // GET request to fetch standings for a specific league
    return this.http.get(
      `${this.apiUrl}standings?league=${leagueId}&season=2023`,
      this.requestOptions
    );
  }

  getFixtures(leagueId: number, teamId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}fixtures?league=${leagueId}&season=2023&team=${teamId}`,
      this.requestOptions
    );
  }

  private dataSubject = new BehaviorSubject<any>(null);
  public data = this.dataSubject.asObservable();

  dataShare(data: any) {
    this.dataSubject.next(data);
  }
}
