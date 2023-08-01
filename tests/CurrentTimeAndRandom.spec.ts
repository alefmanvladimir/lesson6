import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { CurrentTimeAndRandom } from '../wrappers/CurrentTimeAndRandom';
import '@ton-community/test-utils';

describe.skip('CurrentTimeAndRandom', () => {
    let blockchain: Blockchain;
    let currentTimeAndRandom: SandboxContract<CurrentTimeAndRandom>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        currentTimeAndRandom = blockchain.openContract(await CurrentTimeAndRandom.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await currentTimeAndRandom.send(
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
            to: currentTimeAndRandom.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and currentTimeAndRandom are ready to use
    });

    it.skip("should wait 10 sec", async ()=>{
        const deployer = await blockchain.treasury('deployer');
        await currentTimeAndRandom.send(deployer.getSender(),
        {
            value: toNano("0.2")
        }, 'wait 10s')

        await sleep(10500)

        await currentTimeAndRandom.send(deployer.getSender(),
        {
            value: toNano("0.2")
        }, 'wait 10s')
    }, 20000)

    it("should show random", async()=>{
        const randomInt = await currentTimeAndRandom.getRand()
        console.log("randomInt - ", randomInt)
        const random = await currentTimeAndRandom.getRandBetween(-10n, 30n);
        console.log("random - ", random)

        const unixTime = await currentTimeAndRandom.getUnixTime()

        console.log("unixTime - ", unixTime)
    })
});

const sleep = (ms: number)=> new Promise(resolve => setTimeout(resolve, ms))