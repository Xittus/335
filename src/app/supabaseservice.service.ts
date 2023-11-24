import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Filesystem } from '@capacitor/filesystem';
import { decode } from 'base64-arraybuffer';
import { GeolocationService } from './geolocation.service';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, videocam, library } from 'ionicons/icons';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private geolocation: GeolocationService) {
    addIcons({ triangle, ellipse, square, videocam, library });

    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getCategories() {
    const { data, error } = await this.supabase.from('newtable').select('*');

    return data;
  }
  async setInit(name: string, location: any) {
    const { data, error } = await this.supabase
      .from('notesrecord')
      .insert([{ videoName: name, location: location }])
      .select();
  }

  async uploadVid(vid: any) {
    console.log(vid.file);
    const { data: fileData } = await Filesystem.readFile({
      path: vid.file.path,
    });
    const file = 'data:video/mp4;base64,' + fileData;
    const base64 = file.split('base64,')[1];

    console.log('test1', fileData);
    let date = new Date();
    let name = 'Libiray/video' + date.getTime() + '.mp4';
    const { data, error } = await this.supabase.storage
      .from('volleyrecord')
      .upload(name, decode(base64), {
        contentType: 'video/mp4',
      });
    console.log(error);
    const location = await this.geolocation.printCurrentPosition();
    console.log(location);
    this.setInit(name, location);

    LocalNotifications.schedule({
      notifications: [
        {
          largeIcon: 'videocam',
          smallIcon: 'videocam',
          title: 'Video Uploaded Successfully: ' + name,
          body: 'Video Uploaded Successfully, check out the new upload so you can review your last match!!!',
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) },
        },
      ],
    });

    return data;
  }
  async getNotes(id: string) {
    let { data: notes, error } = await this.supabase
      .from('notesrecord')
      .select('notes')
      .eq('videoName  ', id)
      .single();
    return notes;
  }

  async updateNotes(notes: string, videoName: string) {
    const { data, error } = await this.supabase
      .from('notesrecord')
      .update({ notes: notes })
      .eq('videoName', videoName)
      .select();
  }

  async getAllVids() {
    const { data, error } = await this.supabase.storage
      .from('volleyrecord')
      .list('Libiray', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });
    console.log(data);
    return data;
  }

  async deleteVidBucket(name: string) {
    const { data, error } = await this.supabase.storage
      .from('volleyrecord')
      .remove([name]);
    this.deleteVidTable(name);
  }
  async deleteVidTable(name: string) {
    const { error } = await this.supabase
      .from('notesrecord')
      .delete()
      .eq('videoName', name);
  }

  async getVidUrl(name: string) {
    const { data } = this.supabase.storage
      .from('volleyrecord')
      .getPublicUrl('Libiray/' + name);
    return data.publicUrl;
  }
  async getVidId(name: string) {
    const { data } = await this.supabase
      .from('notesrecord')
      .select('id')
      .eq('videoName', name)
      .single();
    return data;
  }
}
