import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Coin{
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  coins : Coin[] = [];
  filteredCoins : Coin[] = [];
  titles : String[] = ["#","Nombre", "Precio", "Cambio de Precio 24h","Volumen total 24h"];
  busqueda = "";

  constructor(private http: HttpClient) {}

  buscar(){
    this.filteredCoins =  this.coins.filter(coin => coin.name.toLowerCase().includes(this.busqueda.toLowerCase())
    ||coin.symbol.toLowerCase().includes(this.busqueda.toLowerCase()))
  }

  ngOnInit() {
    this.http.get<Coin[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=mxn&order=market_cap_desc&per_page=100&page=1")
    .subscribe(
      (res) => {
        this.coins = res;
        this.filteredCoins = res;
        console.log(this.coins);
      },
      (err) => console.log(err)
    );
  }

}
