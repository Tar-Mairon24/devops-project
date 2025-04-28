const Pool = require('pg').Pool
var fs = require('fs');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "api",
    password: "its",
    port: 5432,
})


// GET 
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        console.log('Metod GET: getUsers response: ', results. rows)
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
	
    })
}

// POST
const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO USERS (name, email) VALUES ($1, $2) RETURNIG *', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Usuarios Agregados con ID: ${results.rows[0].id}')
    })
}

// PUT

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 where id= $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send('User modified with ID: ${id}')
        }
    )
}

// DELETE
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, resuslts) => {
        if (error) {
            throw error
        }
        response.status(200).send('USER eliminado con el ID: ${id}')
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
