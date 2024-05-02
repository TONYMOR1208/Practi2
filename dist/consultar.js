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
function consultar() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Consultar todos los registros de la entidad Registro
            const registros = yield prisma.registro.findMany({
                include: {
                    idioma: true, // Incluir los datos del idioma relacionado
                    palabra: true // Incluir los datos de la palabra relacionada
                }
            });
            // Mostrar los resultados por consola
            console.log("Registros encontrados:");
            registros.forEach(registro => {
                console.log("ID:", registro.id);
                console.log("Idioma:", registro.idioma.descripcion);
                console.log("Palabra:", registro.palabra.palabra);
                console.log("Deletreo:", registro.deletreo);
                console.log("Silabas:", registro.silabas);
                console.log("Fonetica:", registro.fonetica);
                console.log("--------------------------");
            });
        }
        catch (error) {
            console.error("Error al consultar la base de datos:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.default = consultar;
