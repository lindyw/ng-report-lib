import { Injectable } from '@angular/core';
import { Category } from '../interfaces/ng-oct-report.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    public categories: Category[] = [];
    public tenant_categories: string[] = [];
    public group_categories: string[] = [];

    /**
     * set the categories list along with each baseline name
     * @param {Category[]} categories - all the categories with its baseline name
     * @todo need to add category for tenant baseline : External (Guest) Users Resharing, we hardcode its category and type here for now
     */
    public setCategories(categories: Category[]) {
        if (categories.find(c => c.name === 'External (Guest) Users Resharing') === undefined) {
            categories.push({
                category: "Sharing",
                type: "tenant",
                name: "External (Guest) Users Resharing"
            })
        }
        this.categories = categories;
        this.tenant_categories = [...new Set(categories?.filter(c => c.type === 'tenant').map(item => item['category']))];
        this.group_categories = [...new Set(categories?.filter(c => c.type === 'group').map(item => item['category']))];
    }

    constructor() { }
}
