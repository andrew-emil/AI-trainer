import { Command } from "@nestjs/cqrs";

type CommandReturn = {
    actionId: string;
}

export class QueueEmailCommand extends Command<CommandReturn> {
    constructor(
        public readonly to: string,
        public readonly subject: string,
        public readonly template: string,
        public readonly payload: Record<string, unknown>,
    ) {
        super();
    }
}