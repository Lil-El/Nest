import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @description
 *  @Get()
 *  findUser(@User('firstName') firstName){
 *    //do sth
 *  }
 */
export const user = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user = request.user;
    return data ? data[user] : user;
  },
);
