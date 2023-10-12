import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FootballDataService } from 'src/Services/football-data.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  leagueName: any;
  tableHeader: string[] = ['', 'Home', 'Goals', '-', 'Goals', 'Away', ''];
  fixturesList: [];
  private subscription: Subscription;

  constructor(private footballservice: FootballDataService) {}

  ngOnInit(): void {
    this.getTeamsData();
  }

  getTeamsData() {
    this.subscription = this.footballservice.data.subscribe((data) => {
      if (data !== null) {
        this.getFixtures(data.leagueId, data.teamId);
      }
    });
  }

  getFixtures(leagueId: number, teamId: number) {
    this.footballservice.getFixtures(leagueId, teamId).subscribe((res) => {
      if (res !== null) {
        res.response.length = 10;
        this.fixturesList = res.response;
        console.log(res);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
