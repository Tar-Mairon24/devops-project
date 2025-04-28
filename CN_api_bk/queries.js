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
    const { name, email } = request.body;

    // First query to get the last ID
    pool.query('SELECT MAX(id) AS last_id FROM users', (error, results) => {
        if (error) {
            throw error;
        }

        const lastId = results.rows[0]?.last_id || 0; // Get the last ID or default to 0
        const nextId = lastId + 1; // Calculate the next ID

        console.log('Metod POST: createUser response: ', results.rows);

        // Second query to insert the new user
        pool.query(
            'INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *',
            [nextId, name, email],
            (error, results) => {
                if (error) {
                    throw error;
                }
                response
                    .status(201)
                    .send(`User added with ID: ${results.rows[0].id}`);
            }
        );
    });
};

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
