-- CreateTable
CREATE TABLE "Idioma" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Idioma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palabra" (
    "id" SERIAL NOT NULL,
    "palabra" TEXT NOT NULL,
    "deletreo" TEXT NOT NULL,

    CONSTRAINT "Palabra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "idIdioma" INTEGER NOT NULL,
    "idPalabra" INTEGER NOT NULL,
    "deletreo" TEXT NOT NULL,
    "silabas" INTEGER NOT NULL,
    "fonetica" TEXT NOT NULL,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_idIdioma_fkey" FOREIGN KEY ("idIdioma") REFERENCES "Idioma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_idPalabra_fkey" FOREIGN KEY ("idPalabra") REFERENCES "Palabra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
