import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service'; // Asegúrate de importar tu servicio SupabaseService

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  newRestaurante: string = ''; // Propiedad para almacenar el nombre del nuevo restaurante
  restaurantes: string[] = []; // Arreglo para almacenar la lista de restaurantes

  constructor(private supabaseService: SupabaseService) {}

  // ...
  async addRestaurante() {
    if (this.newRestaurante.trim() !== '') {
      
      this.restaurantes.push(this.newRestaurante);
  
     
      this.newRestaurante = '';
  
      
      const nuevoRestaurante = {
        nombre: this.newRestaurante,
        direccion: '', 
        telefono: '', 
        horarios: [], 
        
      };
  
      try {
        // Llama a la función del servicio Supabase para insertar el restaurante
        const response = await this.supabaseService.insertRestaurant(nuevoRestaurante);
        console.log('Restaurante agregado exitosamente a Supabase:', response);
      } catch (error) {
        console.error('Error al agregar el restaurante a Supabase:', error);
      }
    }

  }
  async removeRestaurante(restaurantName: string) {
    if (restaurantName) {
      // Elimina el restaurante de la lista local
      const index = this.restaurantes.indexOf(restaurantName);
      if (index !== -1) {
        this.restaurantes.splice(index, 1);
      }
  
      // Aquí puedes llamar a la función en tu servicio Supabase para eliminar el restaurante por nombre
      try {
        await this.supabaseService.deleteRestaurantByName(restaurantName);
        console.log('Restaurante eliminado exitosamente de Supabase.');
      } catch (error) {
        console.error('Error al eliminar el restaurante de Supabase:', error);
      }
    }
  }
  
  
  
} 