import { CompilerConfig } from '@ton-community/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/current_time_and_random.tact',
    options: {
        debug: true
    }
};
