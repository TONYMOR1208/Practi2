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
function buscar(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Buscar el registro por su ID
            const registro = yield prisma.registro.findUnique({
                where: { id },
                include: {
                    idioma: true, // Incluir los datos del idioma relacionado
                    palabra: true // Incluir los datos de la palabra relacionada
                }
            });
            // Verificar si se encontró el registro
            if (registro) {
                // Mostrar los datos del registro por consola
                console.log("Registro encontrado:");
                console.log("ID:", registro.id);
                console.log("Idioma:", registro.idioma.descripcion);
                console.log("Palabra:", registro.palabra.palabra);
                console.log("Deletreo:", registro.deletreo);
                console.log("Silabas:", registro.silabas);
                console.log("Fonetica:", registro.fonetica);
            }
            else {
                console.log("No se encontró ningún registro con el ID proporcionado.");
            }
        }
        catch (error) {
            console.error("Error al buscar en la base de datos:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.default = buscar;
