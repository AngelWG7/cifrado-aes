import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './AESCrypto.css';

function AESCrypto() {

    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');
    const [encripted, setEncripted] = useState(true);

    const encryptMessage = () => {
        const ciphertext = CryptoJS.AES.encrypt(message, key).toString();
        setEncryptedMessage(ciphertext);
        setEncripted(true);
    };

    const decryptMessage = () => {
        const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        setDecryptedMessage(originalText);
        setEncripted(false);
    };

    return (
        <div className="crypto-container">
            <h1>Cifrado AES-GCM</h1>
            <div className="input-section">
                <p><strong>Mensaje:</strong></p>
                <input
                    type="text"
                    placeholder="Texto a cifrar"
                    className='input1'
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div className="input-section">
                <p><strong>Clave:</strong></p>
                <input
                    type="text"
                    placeholder="5"
                    className='input2'
                    onChange={(e) => setKey(e.target.value)}
                />
            </div>
            <div className="result-section">
                <button className='boton1' onClick={encryptMessage}>Cifrar</button>
                <button onClick={decryptMessage}>Descifrar</button>
                {encripted ? <p><strong>Texto Cifrado:</strong> {encryptedMessage}</p> :
                <p><strong>Texto Descifrado:</strong> {decryptedMessage}</p>}
            </div>
        </div>
    );
}

export default AESCrypto;