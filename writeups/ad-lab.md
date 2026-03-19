# Onion Layer Challenge - Writeup

### Challenge Overview
> **Platform:** SK-CERT
> **Category:** Crypto / Encoding

The challenge name hinted at "layers," suggesting the flag was hidden behind multiple levels of encoding.

## Analysis & Solution
Looking at the initial input, I identified the string as **Decimal** values. 

### Step 1: Decimal to Hex
Converting the initial decimal codes revealed a string of Hexadecimal characters.

```bash
# Example of what the decimal looked like
53 53 32 51 48 ...
Step 2: Hex to Base64
Decoding the Hex string resulted in a Base64-encoded string.

Final Step: Plaintext
Finally, decoding the Base64 revealed the plaintext flag.

Flag: SK-CERT{l4y3r3d_lik3_4n_0ni0n}
