import "@stdlib/deploy";

struct TokenInfo{
    ticker: String;
    decimals: Int;
}

message Replace {
    items: map<Int, Address>;
}

message Add {
    key: Int;
    value: Int;
}

contract Map with Deployable {

    map1: map<Int, Bool>;
    map2: map<Int, Address>;
    map3: map<Int, Int>;
    map4: map<Int, TokenInfo>;

    map_addr1: map<Address, Bool>;
    map_addr2: map<Address, Address>;
    map_addr3: map<Address, Int>;
    map_addr4: map<Address, TokenInfo>;

    init(arg: map<Int, Bool>) {
        self.map1 = arg;
    }

    receive("set keys") {
        self.map1.set(0x937, true);
        self.map2.set(123, newAddress(0,0));
        self.map4.set(-900, TokenInfo{ticker: "TON", decimals: 9});

        self.map_addr1.set(newAddress(0,0), true);
        self.map_addr2.set(sender(), newAddress(0, 1));
        self.map_addr4.set(newAddress(0, 3), TokenInfo{ticker: "TON", decimals: 9});
    }

    receive("delete keys") {
        self.map1.set(0x937, null);
        self.map2.set(123, null);
        self.map3.set(-900, null);

        self.map_addr1.set(newAddress(0,0), null);
        self.map_addr2.set(sender(), null);
        self.map_addr3.set(newAddress(0, 3), null);
    }

    receive(msg: Replace){
        self.map2 = msg.items;
    }

    receive("clear") {
        self.map1 = emptyMap();
        self.map2 = emptyMap();
        self.map3 = emptyMap();

        self.map_addr1 = emptyMap();
        self.map_addr2 = emptyMap();
        self.map_addr3 = emptyMap();
    }

    receive(msg: Add){
        self.map3.set(msg.key, msg.value);
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    get fun oneItem(key: Int): Address? {
        return self.map2.get(key);
    }

    get fun allItem(): map<Int, Int> {
        return self.map3;
    }
}
