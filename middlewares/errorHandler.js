export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "NotFoundError") {
    return res.status(400).json({ error: "El item no fue encontrado." });
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({ error: "ID inválido" });
  }

  // Otros errores internos del servidor
  res.status(500).json({ error: "Internal server error" });
};
