import { Injectable } from "@nestjs/common";
import { Category } from "./category.enum";

@Injectable()
export class CategoryService {

  constructor(){}

  public getCategories(): { name: String }[] {
    return Object.keys(Category).map(key => ({ name: Category[key] }));
    /*return JSON.parse(Object.keys(Category).map(key => Category[key]));*/
  }

}
