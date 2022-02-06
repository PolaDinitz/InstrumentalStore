import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { Roles } from "../authorization/roles.decorator";
import { RolesGuard } from "../authorization/roles.guard";
import { JwtAuthGuard } from "../authentication/jwt-auth.guard";
import { Role } from "src/authorization/role.enum";
import { CategoryService } from "./category.service";

@Controller('categories')
export class CategoryController {

  constructor(private categoryService: CategoryService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCategories(@Request() req: any){
    return this.categoryService.getCategories();
  }

}
