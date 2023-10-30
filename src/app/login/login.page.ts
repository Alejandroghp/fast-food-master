import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  nombre = '';

  constructor(
    private readonly supabase: SupabaseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async handleLogin() {
    if (!this.email || !this.password || !this.nombre) {
      // Al menos uno de los campos está vacío, muestra un mensaje de alerta.
      this.presentAlert('Campos incompletos', 'Por favor, completa todos los campos antes de iniciar sesión.');
    } else {
      // Todos los campos están llenos, procede con la lógica de inicio de sesión.
      const loader = await this.supabase.createLoader();
      await loader.present();
      try {
        await this.supabase.signIn(this.email);
        await loader.dismiss(); // Corrección: Cambiar "loader dismiss()" a "loader.dismiss()"
        await this.supabase.createNotice('Check your email for the login link!');
      } catch (error) {
        await loader.dismiss(); // Corrección: Cambiar "loader dismiss()" a "loader.dismiss()"
        await this.supabase.createNotice(error.error_description || error.message);
      }
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
