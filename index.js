const express = require("express");
const app = express();
const cliente = require("./data/clientes.json");
const esValido = require("./reglas/regla-validacion.js");
const PORT = 3000;

app.use(express.json());

app.get("/clientes", (req,res) => {
    res.status(200).json(cliente);
})

app.get("/cliente-val", (req,res) => {
    const validos = cliente.filter((c) => esValido(c.domicilio));
    const result = validos.map((c) => ({
        nombre: c.nombre,
        email: c.email
    }));
    if (result)
        res.status(200).json(result)
    res.status(404).json({
        message: "Clientes no válidos"
    })
})

app.get("/cliente-inval", (req,res) => {
    const invalidos = cliente.filter((c) => !esValido(c.domicilio));
    const result = invalidos.map((c) => ({
        nombre: c.nombre,
        email: c.email
    }));
    if (result)
        res.status(200).json(result)
    res.status(404).json({
        message: "Clientes no inválidos"
    })
})

app.listen(PORT, () => {
    console.log(`El servidor se inició en el puerto ${PORT}`);
})