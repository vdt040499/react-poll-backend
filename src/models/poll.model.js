const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: { 
        type: String,
        require: true
    },

    firstOption: {
        type: String,
        require: true
    },

    secondOption: {
        type: String,
        require: true
    },

    firstOptionVotes: {
        type: Number,
        require: true
    },

    secondOptionVotes: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('Poll', pollSchema);