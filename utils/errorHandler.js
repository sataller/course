module.exports = (res, error) => {
    res.status(500).json({
        resultCode:1,
        message: error.message? error.message: error,
    });
}