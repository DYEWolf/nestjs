import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import * as https from 'https';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly httpService: HttpService,
  ) {}
  async executeSeed() {
    const { data } = await firstValueFrom(
      this.httpService.get('https://pokeapi.co/api/v2/pokemon?limit=650').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw 'An error happened!';
        }),
      ),
    );
    data.results.forEach(({ name, url }) => {
      const pokemonNumber = +url.split('/')[6];
      this.pokemonService.create({ pokemonNumber, name });
    });
  }
}
