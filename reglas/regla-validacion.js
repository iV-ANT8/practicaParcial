const numeros = ["1","2","3","4","5","6","7","8","9"];
const simbolosInvalidos = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];
const palabrasRequeridas = ["Calle", "Avenida", "Bulevar", "Pasaje"];
const abreviaturas = ["Clle.", "Av.", "Ble.", "Psj."];

const estaValidado = [
    {
        "regla": "Longitud: La dirección debe tener entre 20 y 60 caracteres.",
        "fn": direccion => {
            return direccion.length >= 20 && direccion.length <= 60;
        },
    },
    {
        "regla": "Formato: Debe incluir un número de puerta o apartamento.",
        "fn": direccion => {
            return numeros.some((e) => direccion.includes(e));
        },
    },
    {
        "regla": "Caracteres prohibidos: No puede contener símbolos como ! @ # $ % ^ & * ( ) _ +.",
        "fn": direccion => {
            return !simbolosInvalidos.some((s) => direccion.includes(s));
        },
    },
    {
        "regla": "Palabras requeridas: Debe incluir al menos una de: Calle, Avenida, Bulevar, Pasaje.",
        "fn": direccion => {
            return palabrasRequeridas.some((p) => direccion.includes(p));
        },
    },
    {
        "regla": "Consistencia: El código postal (si existe) debe estar al final de la dirección.",
        "fn": direccion => {
            const palabras = direccion.split("");
            const ultimaPal = palabras[palabras.length - 1];
            return ultimaPal.length > 0 && ultimaPal.split("").every((c) => numeros.includes(c));
        }
    },
    {
        "regla": "Sin abreviaturas: No permite abreviaturas como Av. (debe ser Avenida).",
        "fn": direccion => {
            return !abreviaturas.some((a) => direccion.includes(a));
        }
    }
]

function esValido(direccion){
    return estaValidado.every((r) => r.fn(direccion));
}

module.exports = esValido;