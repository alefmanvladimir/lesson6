import { toNano } from 'ton-core';
import { CurrentTimeAndRandom } from '../wrappers/CurrentTimeAndRandom';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const currentTimeAndRandom = provider.open(await CurrentTimeAndRandom.fromInit());

    await currentTimeAndRandom.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(currentTimeAndRandom.address);

    // run methods on `currentTimeAndRandom`
}
