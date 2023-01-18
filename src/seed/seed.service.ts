import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { PokemonResponse } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  async executeSeed() {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    const { data } = await axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
      { httpsAgent },
    );
    data.results.forEach(({name, url}) => {
      const pokemonNumber = +url.split('/')[6];
    });
    return data;
  }
}
