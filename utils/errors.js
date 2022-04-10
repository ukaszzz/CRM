class ValidationError extends Error {
}

class NotFoundError extends Error {
}

function handleError(err, req, res, next) {
    if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error.hbs', {
                message: 'There is no element with that ID.',
            });
    }

    res.status(err instanceof ValidationError ? 400 : 500);

    res.render('error.hbs', {
        message: err instanceof ValidationError ? err.message : 'Sorry, try later!.',
    })
}

module.exports = {
    handleError,
    ValidationError,
    NotFoundError,
}