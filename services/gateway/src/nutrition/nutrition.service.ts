import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { NutritionPatterns } from 'src/common/patterns/nutrition.patterns';

@Injectable()
export class NutritionService {
    constructor(
        @Inject(COACH_DOMAIN_SERVICE)
        private readonly coachDomainClient: ClientProxy,
    ) { }

    searchFoods(query: string, page: number, limit: number) {
        return this.coachDomainClient.send(NutritionPatterns.SEARCH_FOODS, {
            query,
            page,
            limit,
        });
    }

    findOne(id: string) {
        return this.coachDomainClient.send(NutritionPatterns.FIND_ONE, { id });
    }

    findAll(page: number, limit: number) {
        return this.coachDomainClient.send(NutritionPatterns.FIND_ALL, { page, limit });
    }
}
