"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function llenar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Llenar la tabla de Idioma
            const idiomas = [];
            for (let i = 0; i < 5; i++) {
                const idioma = yield prisma.idioma.create({
                    data: {
                        descripcion: `Descripción del Idioma ${i + 1}`
                    }
                });
                idiomas.push(idioma);
            }
            // Llenar la tabla de Palabra
            const palabras = [];
            for (let i = 0; i < 10; i++) {
                const palabra = yield prisma.palabra.create({
                    data: {
                        palabra: `Palabra ${i + 1}`,
                        deletreo: `Deletreo de la Palabra ${i + 1}`
                    }
                });
                palabras.push(palabra);
            }
            // Llenar la tabla de Registro
            for (const idioma of idiomas) {
                for (const palabra of palabras) {
                    yield prisma.registro.create({
                        data: {
                            idioma: { connect: { id: idioma.id } },
                            palabra: { connect: { id: palabra.id } },
                            deletreo: `Deletreo del Registro ${palabra.id} en ${idioma.descripcion}`,
                            silabas: Math.floor(Math.random() * 5) + 1,
                            fonetica: `Fonetica del Registro ${palabra.id} en ${idioma.descripcion}`
                        }
                    });
                }
            }
            console.log("Se han insertado los datos correctamente.");
        }
        catch (error) {
            console.error("Error al llenar la base de datos:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.default = llenar;
