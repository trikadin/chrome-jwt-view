function toByteString(buff :ArrayBuffer|ArrayBufferView) :string {
  return String.fromCharCode(...(new Uint8Array(buff.buffer || buff)));
}

export const base64 = {
  from(str :string) :string {
    str = [].map.call(
      atob(str.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '')),
      (match) => {
        let code = match.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
          code = '0' + code;
        }

        return decodeURIComponent('%' + code);
      }
    ).join('');

    return str;
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
        console.log(chunk, index);
        if (index < 2) {
          JSON.parse(chunk);
        }

        return true;
      } catch (ignore) {
        console.error(ignore);
        return false;
      }
    })
  );
}

const algorithms = {
    HS256: {
      name: 'HMAC',
      hash: {
        name: 'SHA-256'
      }
    }
  };

export async function signJWT(header: Object, payload: Object, secret: string) :string {
  const
    encoder = new TextEncoder('utf-8'),
    algo = algorithms[header.alg],
    cryptoSubtle = crypto.subtle;

  if (!algo) {
    throw new TypeError('Unsupported algorithm');
  }

  let partialToken = stringifyChunk(header) + '.' + stringifyChunk(payload);

  const
    key = await cryptoSubtle.importKey('raw', encoder.encode(secret).buffer, algo, false, ['sign']);

  const
    signature = await cryptoSubtle.sign(algo.name, key, encoder.encode(partialToken).buffer);

  console.log('signature', new Uint8Array(signature), toByteString(signature));

  return toByteString(signature);
}

export async function verifyJWT(token: string, secret: string, alg: string) :boolean {
  const
    parts = token.split('.');


}
