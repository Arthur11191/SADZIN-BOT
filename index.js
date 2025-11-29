const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const qrcode = require("qrcode-terminal")

async function connectBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth")

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("connection.update", ({ connection }) => {
        if (connection === "open") console.log("BOT CONECTADO!")
        if (connection === "close") console.log("CONEÇÃO FECHADA, REINICIANDO...")
    })
}

connectBot()
