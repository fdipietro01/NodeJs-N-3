const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }
    agregarProducto = async (title, description, price, thumbnail, code, stock) => {
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if (title && description && price && thumbnail && code, stock) {
            const data = await this.getProducts()
            if (data.some((prod => prod.code === code))) {
                console.log("Duplicated product")
                return
            }

            data.length === 0 ? producto.id = 1 : producto.id = data[data.length - 1].id + 1
            const newData = JSON.stringify([...data, producto])
            try {
                await fs.promises.writeFile(this.path, newData, 'utf-8')
            }
            catch (err) {
                console.log("Error al grabar el producto", err)
            }
        }
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            try {
                const data = await fs.promises.readFile(this.path)
                const dataParsed = JSON.parse(data)
                return dataParsed
            }
            catch (err) {
                console.log("Error al leer productos", err)
            }
        }
        else {
            console.log("Aún no hay productos agregados")
            await fs.promises.writeFile(this.path, '[]', 'utf-8')
            return []
        }
    }

    getProductById = async (id) => {
        const data = await this.getProducts()
        const find = data.find(prod => prod.id === id)
        return find ? find : "Not Found"
    }

    updateProduct = async (id, field, value) => {
        try {
            const products = await this.getProducts()
            const item = products.find(prod => prod.id === id)
            if (item) {
                item[field] = value
                await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8')
            }
            else {
                console.log("Id inexistente");
            }
        }
        catch (err) {
            console.log("Error al actualizar producto")
        }
    }

    deleteProduct = async () => {
        if (fs.existsSync) {
            try {
                await fs.promises.unlink(this.path)
                console.log("Catalogo eliminado")
            }
            catch (err) {
                console.log("Error al eliminar")
            }
        }
        else {
            console.log("No hay catalogo por eliminar");
        }

    }
}

module.exports = ProductManager