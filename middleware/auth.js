
// auth check

const authCheck = (req, res, next) => {

    console.log('User Ok');

    next();
}
module.exports = {
    authCheck
};