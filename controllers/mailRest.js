// controllers/mailRest.js
const express = require('express');
const nodemailer = require('nodemailer');

const sendMail = (req, resp) => {
    let body = req.body;

    let config = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "conference1ciences@gmail.com",
            pass: "pktb epaw pxkn lboe",
        },
    });

    const options = {
        from: 'Artículos Científicos - Informa',
        to: body.to, // list of receivers
        subject: body.subject,// Subject line
        html: body.message, // Aquí cambiamos 'text' a 'html'
    };

    config.sendMail(options, (error, result) => {
        if (error) return resp.json({ok: false, msg: 'Error al enviar el correo', error});

        return resp.json({ok: true, msg: 'Correo enviado correctamente', result});

    });
}

module.exports = {sendMail};