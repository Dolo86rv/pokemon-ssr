import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Genera las primeras 5 páginas (puedes ajustar según tus necesidades)
      const pages = [];
      for (let i = 1; i <= 5; i++) {
        pages.push({ page: i.toString() });
      }
      return pages;
    }
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Genera los primeros 20 pokémons (puedes ajustar según tus necesidades)
      const pokemons = [];
      for (let i = 1; i <= 20; i++) {
        pokemons.push({ id: i.toString() });
      }
      return pokemons;
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
