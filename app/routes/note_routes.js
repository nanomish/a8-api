var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send('Note ' + id + ' deleted!');
        } 
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        } 
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        //{ '_id': '59500edda919c17ec1f78e7f' };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });    
    });

    app.post('/notes', (req, res) => {
        console.log('post request to notes, body: ', req.body);
        console.log('post request to notes, body parsed : ', Object.keys(req.body));
        var note = JSON.parse(Object.keys(req.body)[0]);
        console.log('post request to notes, body: ', note);
        db.collection('notes').insert(note, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
  });
};