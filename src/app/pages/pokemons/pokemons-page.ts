import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import PokemonList from "../../pokemons/components/pokemon-list/pokemon-list";
import PokemonListSkeleton from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";
import { PokemonsService } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
})
export default class PokemonsPage {

  private pokemonService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map( page => ( isNaN(+page) ? 1 : +page )),
      map( page => Math.max(1, page) )
    )
  );

  //public isLoading = signal(true);
  //private appRef = inject(ApplicationRef);
  //private $appState = this.appRef.isStable.subscribe( isStable => {
  //  console.log({isStable});
  //})

  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage());
  }, { allowSignalWrites: true } );
  //ngOnInit(): void {
  //  //this.route.queryParamMap.subscribe(console.log);
  //  console.log(this.currentPage());
  //  this.loadPokemons();
  //  //setTimeout(() => {
  //  //  this.isLoading.set(false);
  //  //}, 5000);
  //}

  //ngOnDestroy(): void {
  //  this.$appState.unsubscribe();
  //}

  public loadPokemons(page = 0) {

    const pageLoad = this.currentPage()! + page;

    //console.log({pageLoad, current: this.currentPage()});

    this.pokemonService.loadPage(pageLoad)
    .pipe(
      //tap(() => this.router.navigate([], { queryParams: { page: pageLoad } }) ),
      tap( () => this.title.setTitle(`Pokemons SSR - Página ${pageLoad}`) )
    )
    .subscribe( (pokemons) => {
      this.pokemons.set(pokemons);
      //console.log('On Init');
    });
  }
}
