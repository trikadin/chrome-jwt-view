function toByteString(buff :ArrayBuffer|ArrayBufferView) :string {
  return String.fromCharCode(...(new Uint8Array(buff.buffer || buff)));
}

export const algorithms = {
  HS256: {
    name: 'HMAC',
    hash: {
      name: 'SHA-256'
    }
  }
};

export const base64 = {
  from(str :string) :string {
    return atob(str.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, ''));
  },

  to(str :string) :string {
    return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
};

export function stringifyChunk(chunk :string|Object) :string {
  if (typeof chunk === 'string') {
    chunk = JSON.parse(chunk);
  }

  return base64.to(JSON.stringify(chunk));
}

export function isJWT(str: string) :boolean {
  const chunks = str.split('.');
  return (
    chunks.length === 3 &&
    chunks.every((chunk, index) => {
      try {
        chunk = base64.from(chunk);
        if (index < 2) {
          JSON.parse(chunk);
        }

        return true;
      } catch (ignore) {
        console.error(ignore);
        console.error(ignore.stack);
        return false;
      }
    })
  );
}

export async function signJWT(header: Object, payload: Object, secret: string) :string {
  const
    encoder = new TextEncoder(),
    algo = algorithms[header.alg],
    cryptoSubtle = crypto.subtle;

  if (!algo) {
    throw new TypeError('Unsupported algorithm');
  }

  let partialToken = stringifyChunk(header) + '.' + stringifyChunk(payload);

  const
    key = await cryptoSubtle.importKey('raw', encoder.encode(secret), algo, false, ['sign']);

  const
    signature = await cryptoSubtle.sign(algo, key, encoder.encode(partialToken).buffer);

  return toByteString(signature);
}

export async function verifyJWT(token: string, secret: string, alg: string = 'HS256') :boolean {
  if (!isJWT(token)) {
    return false;
  }

  const
    algo = algorithms[alg],
    encoder = new TextEncoder(),
    chunks = token.split('.'),
    message = chunks.slice(0, 2).join('.'),
    signature = base64.from(chunks[2]),
    key = await crypto.subtle.importKey('raw', encoder.encode(secret), algo, false, ['sign']),
    testSignature = await crypto.subtle.sign(algo, key, encoder.encode(message));

  return toByteString(testSignature) === signature;
}
