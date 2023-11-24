import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RecordvidComponent } from '../recordvid/recordvid.component';
import { MediaCapture } from '@whiteguru/capacitor-plugin-media-capture';
import { SupabaseService } from '../supabaseservice.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    ExploreContainerComponent,
    RecordvidComponent,
    IonicModule,
  ],
})
export class Tab1Page {
  constructor(private service: SupabaseService) {

  }
  captureVideo() {
    MediaCapture.captureVideo({}).then((data) => {
     
      this.service.uploadVid(data);
      console.log(data);
    });
  }

}
