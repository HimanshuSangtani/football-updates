import { Component, OnInit } from '@angular/core';
import { FootballDataService } from 'src/Services/football-data.service';

@Component({
  selector: 'app-league-selection',
  templateUrl: './league-selection.component.html',
  styleUrls: ['./league-selection.component.css'],
})
export class LeagueSelectionComponent implements OnInit {
  selectedCountry: string = 'England';
  selectedLeagueId: number;
  standingList: [] = [];
  countries: string[] = ['England', 'Spain', 'Germany', 'France', 'Italy'];
  tableHeader: string[] = [
    '',
    '',
    'Name',
    'Games',
    'W',
    'L',
    'D',
    'Goal Difference',
    'Points',
  ];
  leagueIds: {} = {
    England: 39,
    Spain: 140,
    Germany: 78,
    France: 61,
    Italy: 135,
  };

  constructor(private footballservice: FootballDataService) {}

  ngOnInit(): void {
    this.footballservice.data.subscribe((data) => {
      let country = 'England';
      if (data !== null) {
        country = Object.keys(this.leagueIds).find(
          (key) => this.leagueIds[key] === data?.leagueId
        );
      }
      this.selectedCountry = country;
      this.getStandings(country);
    });
  }

  showCountryData(country: string) {
    this.selectedCountry = country;
    this.getStandings(country);
  }

  getStandings(league: string) {
    this.selectedLeagueId = this.leagueIds[league];

    this.footballservice
      .getStandings(this.selectedLeagueId)
      .subscribe((res) => {
        if (res !== null) {
          this.standingList = res.response[0].league['standings'][0];
          console.log(this.standingList);
        }
      });
  }

  sendFixturesData(standing) {
    let fixturesData = {
      leagueId: this.selectedLeagueId,
      teamId: standing.team.id,
    };
    this.footballservice.dataShare(fixturesData);
  }
}
