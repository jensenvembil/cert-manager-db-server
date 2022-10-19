const mongoose = require("mongoose");

const CertSchema = new mongoose.Schema({

    youthName: {
        type:String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    createdDate : {
        type: Date, default: Date.now
    }
});

const certMaster = mongoose.model("certMaster", CertSchema);
module.exports = certMaster;