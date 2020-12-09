// src/service/variable.ts

import { Variable } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

export class VariableService {
    private static INSTANCE: VariableService;
    private variableRepo: Repository<Variable>;

    public static init(): VariableService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new VariableService();
        }
        return this.INSTANCE;
    }

    public static getInstace(): VariableService {
        return this.INSTANCE;
    }

    constructor() {
        this.variableRepo = getRepository(Variable);
    }

    public async getByName(name: string): Promise<Variable> {
        const variable: Variable | undefined = await this.variableRepo.findOne({
            name: name,
        });

        if(variable === undefined) {
            throw new Error(`No such Variable with name: ${name}.`);
        }

        return variable;
    }

    public async deleteByName(name: string): Promise<boolean> {
        const result: DeleteResult = await this.variableRepo.delete({
            name: name,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}