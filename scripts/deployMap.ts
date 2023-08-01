import { toNano } from 'ton-core';
import { Map } from '../wrappers/Map';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const map = provider.open(await Map.fromInit());

    await map.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(map.address);

    // run methods on `map`
}
