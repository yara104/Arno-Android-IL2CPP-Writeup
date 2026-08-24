from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad


key = bytes.fromhex(
    "cfdc33ccbee6dc775ba146b95d0fea6cbcc3ee3e5e76531d2cd79c140758f08d"
)

iv = bytes.fromhex(
    "bbf5a8d7066fd51b43d959c044365cdf"
)

ciphertext = bytes.fromhex(
    "13ebf3953a9b8c13c6e5471f7eeaa0174b6c1fac41802002da16eb32fa88f63c570185a8bc218d9ef3ac03e218d30c55"
)


cipher = AES.new(key, AES.MODE_CBC, iv)

plaintext = cipher.decrypt(ciphertext)

print("[+] Raw plaintext:")
print(plaintext)

print("\n[+] Flag:")

try:
    print(unpad(plaintext, AES.block_size).decode())
except ValueError:
    print(plaintext.decode(errors="replace"))