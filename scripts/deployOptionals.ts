import { toNano } from 'ton-core';
import { Optionals } from '../wrappers/Optionals';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const optionals = provider.open(await Optionals.fromInit());

    await optionals.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(optionals.address);

    // run methods on `optionals`
}
