import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function consultar() {
    try {
        // Consultar todos los registros de la entidad Registro
        const registros = await prisma.registro.findMany({
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

    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default consultar;
