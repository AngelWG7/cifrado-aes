import React, { useState } from 'react';

function AESCrypto() {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [encryptionKey, setEncryptionKey] = useState(null);

  // Función para generar una clave AES-GCM
  const generateAESKey = async () => {
    try {
      const key = await window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256, // Puedes usar 128, 192 o 256 bits
        },
        true,
        ['encrypt', 'decrypt']
      );
      setEncryptionKey(key);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para cifrar un mensaje
  const encryptAES = async () => {
    if (!encryptionKey) {
      console.error('Genera una clave antes de cifrar.');
      return;
    }

    const encoder = new TextEncoder();
    const encodedData = encoder.encode(inputText);

    try {
      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Vector de inicialización de 12 bytes
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        encryptionKey,
        encodedData
      );
      setEncryptedText(btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedData))));
    } catch (error) {
      console.error(error);
    }
  };

  // Función para descifrar un mensaje
  const decryptAES = async () => {
    if (!encryptionKey) {
      console.error('Genera una clave antes de descifrar.');
      return;
    }

    const encryptedArray = new Uint8Array(atob(encryptedText).split('').map(char => char.charCodeAt(0)));

    try {
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: encryptedArray.slice(0, 12),
        },
        encryptionKey,
        encryptedArray.slice(12)
      );

      const decoder = new TextDecoder();
      setDecryptedText(decoder.decode(decryptedData));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={generateAESKey}>Generar Clave</button>
      <div>
        <input
          type="text"
          placeholder="Texto a cifrar"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={encryptAES}>Cifrar</button>
      </div>
      <div>
        <p>Texto Cifrado: {encryptedText}</p>
        <button onClick={decryptAES}>Descifrar</button>
      </div>
      <div>
        <p>Texto Descifrado: {decryptedText}</p>
      </div>
    </div>
  );
}

export default AESCrypto;
