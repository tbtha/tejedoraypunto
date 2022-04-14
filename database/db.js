const pool = require("./migrate")

const geProductosDB = async () => {
    const client = await pool.connect()
    try{
        const respuesta = await client.query("SELECT * FROM Productos;")
        return {
            ok:true,
            msg: respuesta.rows,
        }
    }catch(e){
        console.log(e)
        return {
            ok:false,
            msg: error.message ,
        }
    }finally{
        client.release()
    }
}

module.exports = {
    geProductosDB
}