import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit: number = this.configService.getOrThrow('DEFAULT_LIMIT');
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    console.log();
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(queryParameters: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = queryParameters;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({
        pokemonNumber: 1,
      })
      .select('-__v');
  }

  async findOne(param: string) {
    let pokemon: Pokemon;
    if (!isNaN(+param)) {
      pokemon = await this.pokemonModel.findOne({ pokemonNumber: param });
    } else if (isValidObjectId(param)) {
      pokemon = await this.pokemonModel.findById(param);
    } else if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: param.toLocaleLowerCase().trim(),
      });
    }
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with pokemon number ${param} not found`,
      );
    return pokemon;
  }

  async update(param: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(param);
    updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    try {
      if (updatePokemonDto.name) {
        await pokemon.updateOne(updatePokemonDto);
      }
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Error ${error.code}, pokemon exist in db`);
    }
    throw new InternalServerErrorException(`Unable to create Pokemon`);
  }
}
