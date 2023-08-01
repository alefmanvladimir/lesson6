import "@stdlib/deploy";

struct StrcOpts{
    num: Int?;
    bool: Bool?;
    addr: Address?;
}

message MsgOpts{
    num: Int?;
    bool: Bool?;
    addr: Address?;
    opts: StrcOpts?;
}

contract Optionals with Deployable {

    num: Int?;
    bool: Bool?;
    addr: Address?;
    strc: StrcOpts?;

    init(a: Int?, b: Bool?, c: Address?) {
        self.num = a;
        self.bool = b;
        self.addr = c;
        self.strc = StrcOpts{num: null, bool: true, addr: null};
    }

    receive(msg: MsgOpts){
        if(msg.num != null){
            self.num = msg.num!!;
        }
    }

    get fun optInt(): Int?{
        return self.num;
    }

    get fun optIntVal(): Int{
        if(self.num==null){
            return -1;
        }
        return self.num!!;
    }

    get fun optNested(): Int?{
        if(self.strc != null && (self.strc!!).num != null){
            return (self.strc!!).num!!;
        }
        return null;
    }
}
