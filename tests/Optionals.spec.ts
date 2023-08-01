import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { Optionals } from '../wrappers/Optionals';
import '@ton-community/test-utils';

describe.skip('Optionals', () => {
    let blockchain: Blockchain;
    let optionals: SandboxContract<Optionals>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        optionals = blockchain.openContract(await Optionals.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await optionals.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: optionals.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and optionals are ready to use
    });
});
