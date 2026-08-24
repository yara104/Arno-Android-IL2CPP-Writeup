const lib = Process.findModuleByName("libil2cpp.so");

if (lib === null) {
    throw new Error("libil2cpp.so not found");
}

console.log("[+] Base: " + lib.base);

const getKeyAddr = lib.base.add(0x16D1838);
const getIVAddr = lib.base.add(0x16D18A8);
const getFlagAddr = lib.base.add(0x16D1918);

console.log("[+] GetKey: " + getKeyAddr);
console.log("[+] GetIV:  " + getIVAddr);
console.log("[+] GetFlag: " + getFlagAddr);

const GetKey = new NativeFunction(
    getKeyAddr,
    "pointer",
    ["pointer"]
);

const GetIV = new NativeFunction(
    getIVAddr,
    "pointer",
    ["pointer"]
);

const GetFlag = new NativeFunction(
    getFlagAddr,
    "pointer",
    ["pointer"]
);

function extractByteArray(retval, name) {

    if (retval.isNull()) {
        console.log("[-] " + name + " returned NULL");
        return;
    }

    const length = retval.add(0x18).readU32();

    console.log("\n[+] " + name + " length: " + length);

    const data = retval.add(0x20).readByteArray(length);

    console.log(hexdump(data, {
        offset: 0,
        length: length,
        header: true,
        ansi: false
    }));
}

console.log("\n[*] Extracting Key...");
extractByteArray(GetKey(ptr(0)), "KEY");

console.log("\n[*] Extracting IV...");
extractByteArray(GetIV(ptr(0)), "IV");

console.log("\n[*] Extracting Flag ciphertext...");
extractByteArray(GetFlag(ptr(0)), "CIPHERTEXT");