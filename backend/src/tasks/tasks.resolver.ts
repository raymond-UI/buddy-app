// src/tasks/tasks.resolver.ts

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { CreateTaskInput, UpdateTaskInput, TaskWhereInput } from './dto/task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [Task])
  async tasks(@Args('where', { nullable: true }) where: TaskWhereInput) {
    return this.tasksService.findAll(where);
  }

  @Mutation(() => Task)
  async createTask(@Args('data') data: CreateTaskInput) {
    return this.tasksService.create(data);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: UpdateTaskInput,
  ) {
    return this.tasksService.update(id, data);
  }

  @Mutation(() => Task)
  async deleteTask(@Args('id', { type: () => ID }) id: string) {
    return this.tasksService.delete(id);
  }
}