import { Component, OnInit } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabaseservice.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, FormsModule, CommonModule],
})
export class Tab3Page implements OnInit {
  url = '';
  notes = '';
  videoName = '';
  constructor(
    private supabaseService: SupabaseService,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  fullName = 'Libiray/' + this.videoName;

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.videoName = id;
    }
    this.fullName = 'Libiray/' + this.videoName;
    console.log(this.fullName);
    this.supabaseService.getNotes(this.fullName).then((data) => {
      if (data) {
        this.notes = (data as any).notes;
      }
    });
    this.supabaseService.getVidUrl(this.videoName).then((url) => {
      console.log(url);
      this.url = url;
    });
  }

  saveNotes() {
    console.log(this.notes);
    this.supabaseService.updateNotes(this.notes, this.fullName);
    console.log(this.notes + 'saved');
  }
  deleteVid() {
    this.supabaseService.deleteVidBucket(this.fullName);
    this.route.navigate(['tabs/tab1']);
  }
}
