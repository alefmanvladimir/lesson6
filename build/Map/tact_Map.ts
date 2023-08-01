import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type TokenInfo = {
    $$type: 'TokenInfo';
    ticker: string;
    decimals: bigint;
}

export function storeTokenInfo(src: TokenInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.ticker);
        b_0.storeInt(src.decimals, 257);
    };
}

export function loadTokenInfo(slice: Slice) {
    let sc_0 = slice;
    let _ticker = sc_0.loadStringRefTail();
    let _decimals = sc_0.loadIntBig(257);
    return { $$type: 'TokenInfo' as const, ticker: _ticker, decimals: _decimals };
}

function loadTupleTokenInfo(source: TupleReader) {
    let _ticker = source.readString();
    let _decimals = source.readBigNumber();
    return { $$type: 'TokenInfo' as const, ticker: _ticker, decimals: _decimals };
}

function storeTupleTokenInfo(source: TokenInfo) {
    let builder = new TupleBuilder();
    builder.writeString(source.ticker);
    builder.writeNumber(source.decimals);
    return builder.build();
}

function dictValueParserTokenInfo(): DictionaryValue<TokenInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenInfo(src)).endCell());
        },
        parse: (src) => {
            return loadTokenInfo(src.loadRef().beginParse());
        }
    }
}

export type Replace = {
    $$type: 'Replace';
    items: Dictionary<bigint, Address>;
}

export function storeReplace(src: Replace) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1384510466, 32);
        b_0.storeDict(src.items, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
    };
}

export function loadReplace(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1384510466) { throw Error('Invalid prefix'); }
    let _items = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    return { $$type: 'Replace' as const, items: _items };
}

function loadTupleReplace(source: TupleReader) {
    let _items = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'Replace' as const, items: _items };
}

function storeTupleReplace(source: Replace) {
    let builder = new TupleBuilder();
    builder.writeCell(source.items.size > 0 ? beginCell().storeDictDirect(source.items, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    return builder.build();
}

function dictValueParserReplace(): DictionaryValue<Replace> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReplace(src)).endCell());
        },
        parse: (src) => {
            return loadReplace(src.loadRef().beginParse());
        }
    }
}

export type Add = {
    $$type: 'Add';
    key: bigint;
    value: bigint;
}

export function storeAdd(src: Add) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1668298290, 32);
        b_0.storeInt(src.key, 257);
        b_0.storeInt(src.value, 257);
    };
}

export function loadAdd(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1668298290) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadIntBig(257);
    let _value = sc_0.loadIntBig(257);
    return { $$type: 'Add' as const, key: _key, value: _value };
}

function loadTupleAdd(source: TupleReader) {
    let _key = source.readBigNumber();
    let _value = source.readBigNumber();
    return { $$type: 'Add' as const, key: _key, value: _value };
}

function storeTupleAdd(source: Add) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserAdd(): DictionaryValue<Add> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAdd(src)).endCell());
        },
        parse: (src) => {
            return loadAdd(src.loadRef().beginParse());
        }
    }
}

 type Map_init_args = {
    $$type: 'Map_init_args';
    arg: Dictionary<bigint, boolean>;
}

function initMap_init_args(src: Map_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.arg, Dictionary.Keys.BigInt(257), Dictionary.Values.Bool());
    };
}

async function Map_init(arg: Dictionary<bigint, boolean>) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMap_init_args({ $$type: 'Map_init_args', arg })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Map_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const Map_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenInfo","header":null,"fields":[{"name":"ticker","type":{"kind":"simple","type":"string","optional":false}},{"name":"decimals","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Replace","header":1384510466,"fields":[{"name":"items","type":{"kind":"dict","key":"int","value":"address"}}]},
    {"name":"Add","header":1668298290,"fields":[{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Map_getters: ABIGetter[] = [
    {"name":"oneItem","arguments":[{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"allItem","arguments":[],"returnType":{"kind":"dict","key":"int","value":"int"}},
]

const Map_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"set keys"}},
    {"receiver":"internal","message":{"kind":"text","text":"delete keys"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Replace"}},
    {"receiver":"internal","message":{"kind":"text","text":"clear"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Add"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Map implements Contract {
    
    static async init(arg: Dictionary<bigint, boolean>) {
        return await Map_init(arg);
    }
    
    static async fromInit(arg: Dictionary<bigint, boolean>) {
        const init = await Map_init(arg);
        const address = contractAddress(0, init);
        return new Map(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Map(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Map_types,
        getters: Map_getters,
        receivers: Map_receivers,
        errors: Map_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'set keys' | 'delete keys' | Replace | 'clear' | Add | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'set keys') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'delete keys') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Replace') {
            body = beginCell().store(storeReplace(message)).endCell();
        }
        if (message === 'clear') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Add') {
            body = beginCell().store(storeAdd(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOneItem(provider: ContractProvider, key: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(key);
        let source = (await provider.get('oneItem', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getAllItem(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('allItem', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    
}