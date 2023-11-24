import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabaseservice.service';
import { IfStmt } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, FormsModule, CommonModule],
})
export class Tab2Page implements OnInit {
  notes = '';
  listOfVids: Array<any> = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos() {
    this.supabaseService.getAllVids().then((data) => {
      if (data) {
        this.listOfVids = data as any;
        console.log(this.listOfVids);
      }
    });
  }
}
