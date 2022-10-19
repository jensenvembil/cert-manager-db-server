const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const CertModel = require('./models/certMaster');

dotenv.config();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.DBHOST, {
    useNewUrlParser: true
})

var port = process.env.PORT || 80;
app.listen(port,() => {
    console.log('server is running at PORT -- >'+ port);
});

console.log(process.env.DBHOST);

app.post('/create', async (req, res) => {
    //const cert= new CertModel({ youthName:req.body.youthName, eventName:req.body.eventName, eventDate: req.body.eventDate});
    console.log(req.body);
    var cert = new CertModel(req.body);
    try {
        await cert.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({ data: "Data has been inserted successfully!" });
            }
        });

    } catch (error) {
        console.log(error);

    }
});
app.get('/', async (req, res) => {
    CertModel.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
})

app.post('/delete/:id', async (req, res) => {
    CertModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            res.send(error);
        }
        else {
            res.status(200).json({ msg: data });
        }
    })

})

app.post('/update/:id', async (req, res) => {
    CertModel.findByIdAndUpdate(
        req.params.id, {
        $set: req.body
    },
        (error, data) => {
            if (error) {
                res.send(error);
            }
            else {
                res.json(data);
                console.log("Data updated successfully!");
            }
        })

})