const express = require('express')
const ProductManager = require('./ProductManager')

const dbFile = new ProductManager('./productos')

const app = express()
const PORT = 8080


app.get("/products", async (req, res) => {
    const { limit } = req.query
    const productos = await dbFile.getProducts()
    if (!limit) return res.send({ productos })
    res.send({ productos: productos.slice(0, limit) })
})

app.get("/products/:pid", async (req, res) =>{
    const {pid} = req.params
    const productos = await dbFile.getProducts()
    const filtrado = productos.find(prd => prd.id === Number(pid))
    return filtrado ? res.send({producto: filtrado}) : res.send({Error: "No se encontró producto"})
})


app.listen(PORT, () => {
    console.log("Escuchando en el 8080")
})


//agrega-mockea productos para llevar adelante las peticiones desde el server
const agregarProductos = async ()=>{
    //adding products
    await dbFile.agregarProducto("producto prueba1", "Este es un producto prueba", 100, "Sin Imagen", "abc001", 25)
    await dbFile.agregarProducto("producto prueba2", "Este es un producto prueba", 200, "Sin Imagen", "abc002", 50)
    await dbFile.agregarProducto("producto prueba3", "Este es un producto prueba", 300, "Sin Imagen", "abc003", 75)
    await dbFile.agregarProducto("producto prueba4", "Este es un producto prueba", 400, "Sin Imagen", "abc004", 100)
    await dbFile.agregarProducto("producto prueba5", "Este es un producto prueba", 500, "Sin Imagen", "abc005", 125)
    await dbFile.agregarProducto("producto prueba6", "Este es un producto prueba", 600, "Sin Imagen", "abc006", 150)
    await dbFile.agregarProducto("producto prueba7", "Este es un producto prueba", 700, "Sin Imagen", "abc007", 175)
    await dbFile.agregarProducto("producto prueba8", "Este es un producto prueba", 800, "Sin Imagen", "abc008", 200)
    await dbFile.agregarProducto("producto prueba9", "Este es un producto prueba", 900, "Sin Imagen", "abc009", 225)
    await dbFile.agregarProducto("producto prueba10", "Este es un producto prueba", 1000, "Sin Imagen", "abc010", 250)
}

agregarProductos()