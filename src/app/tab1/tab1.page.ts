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
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    RecordvidComponent,
    IonicModule,
  ],
})
export class Tab1Page {
  constructor() {

  }
  captureVideo() {
    MediaCapture.captureVideo({}).then((data) => {
      console.log(data);
    });
  }

}
