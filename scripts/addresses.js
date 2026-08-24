const lib = Process.findModuleByName("libil2cpp.so");

if (lib === null) {
    throw new Error("libil2cpp.so not found");
}

console.log("[+] libil2cpp.so base: " + lib.base);

const getKey = lib.base.add(0x732c000);
const getIV = lib.base.add(0x732c000);
const getFlag = lib.base.add(0x732c000);
const decryptFlag = lib.base.add(0x732c000);

console.log("[+] GetKey:      " + getKey);
console.log("[+] GetIV:       " + getIV);
console.log("[+] GetFlag:     " + getFlag);
console.log("[+] DecryptFlag: " + decryptFlag);