import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase : SupabaseClient

  constructor() {
this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
   }

   
async getCategories (){    
const { data, error } = await this.supabase
.from('newtable')
.select('*')

return data;        
   }

}
