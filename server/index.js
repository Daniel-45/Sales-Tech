import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

dotenv.config({path: 'variables.env'});

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    // A través del context se comunican cliente y servidor
    context: async ({req}) => {
        // Obtener el Token
        const token = req.headers['authorization'];

        // console.log(typeof token);
        // console.log(token);

        if (token !== 'null') {
            try {
                // Verificar el Token del Frontend
                const usuarioActual = await jwt.verify(token, process.env.SECRETO);

                // Añadir usuario actual a request
                req.usuarioActual = usuarioActual;

                // console.log(usuarioActual);

                return {
                    usuarioActual
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
});

server.applyMiddleware({ app }); // Conexión de Apollo Server con Express

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}${server.graphqlPath}`)
});

app.post("/api/send-mail", (request, response) => {
    // console.log(request.body);
    nodemailer.createTestAccount((error, account) => {
        const htmlEmail = `
            <h3>Email enviado desde React</h3>
            <p>Para: ${request.body.email}</p>
            <p>Asunto: ${request.body.asunto}</p>
            <h3>Mensaje</h3>
            <p>${request.body.mensaje}</p>
        `;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "salestech.spain@gmail.com",
                pass: "Sales_Tech"
            }
        });

        let mailOptions = {
            from: "salestech.spain@gmail.com",
            to: request.body.email,
            replyTo: "salestech.spain@gmail.com",
            subject: request.body.asunto,
            text: request.body.mensaje,
            html: htmlEmail
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            } 
            // console.log("Mensaje enviado: %s", info.mensaje);
            // console.log("URL del mensaje: %s", nodemailer.getTestMessageUrl(info));
        })
    });
});

