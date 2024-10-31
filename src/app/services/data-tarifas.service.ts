import { inject, Injectable } from '@angular/core';
import { Tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataTarifasService {
  editar(valor: any) {
    throw new Error('Method not implemented.');
  }
  tarifas: Tarifa[] = []
  authService = inject(DataAuthService);

  constructor() {
    this.getTarifas()
  }

  async getTarifas() {
    const res = await fetch('http://localhost:4000/tarifas', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("authToken")
      },
    })
    if (res.status !== 200) {
      console.log("Error")
    } else {
      this.tarifas = await res.json();
      console.log(this.tarifas)
    }
  }

  async actualizarTarifa(tarifa: Tarifa) {
    let valor = tarifa.valor;
    const body = { valor }
    const res = await fetch(`http://localhost:4000/tarifas/${tarifa.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    console.log(res)
    if (res.status !== 200) {
      console.log("Error al actualizar la tarifa")
    } else {
      console.log("Actualizacion de tarifa exitosa")
    };
  }

}