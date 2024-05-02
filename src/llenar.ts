import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function llenar() {
    try {
        // Llenar la tabla de Idioma
        const idiomas = [];
        for (let i = 0; i < 5; i++) {
            const idioma = await prisma.idioma.create({
                data: {
                    descripcion: `Descripción del Idioma ${i + 1}`
                }
            });
            idiomas.push(idioma);
        }

        // Llenar la tabla de Palabra
        const palabras = [];
        for (let i = 0; i < 10; i++) {
            const palabra = await prisma.palabra.create({
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
                await prisma.registro.create({
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
    } catch (error) {
        console.error("Error al llenar la base de datos:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default llenar;
