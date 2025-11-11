import { Component, computed, effect, input, signal } from '@angular/core';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  public pokemon = input.required<SimplePokemon>();
  public readonly pokemonImage = computed( () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ this.pokemon().id }.svg`
  );

  logEffect = effect( () => {
    console.log('Pokemon Card:', this.pokemon());
  } );




}
