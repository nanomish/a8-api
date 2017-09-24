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

    app.get('/lists/', (req, res) => {
        // using query params
        const filter = {username: { $eq: req.query.username }}

        db.collection('lists').find(filter).toArray(function(err, items) {
          if (err) {
            res.send({'error': 'An error has occurred while querying DB'});
          } else {
            console.log('items got: ', items);
            res.send(items)
          }          
        });
    });


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