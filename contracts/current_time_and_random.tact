import "@stdlib/deploy";

contract CurrentTimeAndRandom with Deployable {
    deployTime: Int as uint32;

    init() {
        self.deployTime = now();    
    }

    receive("wait 10s"){
        require(now() - self.deployTime > 10, "Did not wait long enough");
        dump("thanks for waiting 10 seconds");
    }

    receive("wait 10d"){
        require(now() - self.deployTime > 10*24*60*60, "Did not wait long enough");
        dump("thanks for waiting 10 days");
    }

    get fun unixTime(): Int {
        return now();
    }

    get fun rand(): Int{
        return randomInt();
    }

    get fun randBetween(from: Int, to: Int): Int{
        return random(from, to);
    }
}
