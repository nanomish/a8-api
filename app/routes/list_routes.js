var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.delete('/lists/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('lists').remove(details, (err, item) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send('list ' + id + ' deleted!');
        } 
        });
    });

    app.put('/lists/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const list = { text: req.body.body, title: req.body.title };
        db.collection('lists').update(details, list, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(list);
        } 
        });
    });

    app.get('/lists/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        //{ '_id': '59500edda919c17ec1f78e7f' };
        db.collection('lists').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });    
    });

    app.get('/lists/:user', (req, res) => {
        const id = req.params.id;
        const details = {user: { $gt: value1, $lt: value2 } }
        //{ '_id': '59500edda919c17ec1f78e7f' };
        db.collection('lists').find(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });    
    });

    //db.collection.find( { field: { $gt: value1, $lt: value2 } } );

    app.post('/lists', (req, res) => {
        console.log('post request to lists, body parsed : ', Object.keys(req.body));
        var list = JSON.parse(Object.keys(req.body)[0]);
        console.log('post request to lists, body: ', list);
        db.collection('lists').insert(list, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
  });
};