// Shopping list controller

const getLists = (req, res, next) => {
    console.log('user: ')
    res.render('index', {
        title: 'Tehtävälista'
    });
};

module.exports.getLists = getLists; 