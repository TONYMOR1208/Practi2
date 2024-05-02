import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function buscar(id: number) {
    try {
        // Buscar el registro por su ID
        const registro = await prisma.registro.findUnique({
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
        } else {
            console.log("No se encontró ningún registro con el ID proporcionado.");
        }

    } catch (error) {
        console.error("Error al buscar en la base de datos:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default buscar;
