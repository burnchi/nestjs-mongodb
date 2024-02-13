import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationQueryDto } from './dto/Pagination.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>
  ) { }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto)
    return coffee.save()
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.coffeeModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec()
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findById(id).exec()

    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not find!`)
    }
    return coffee
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec()

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee ${id} not find!`)
    }
    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.coffeeModel.deleteOne({ _id: id })
    return coffee
  }
}
