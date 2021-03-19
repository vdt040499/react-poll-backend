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
        require: true,
        default: 0
    },

    secondOptionVotes: {
        type: Number,
        require: true,
        default: 0
    }
});

module.exports = mongoose.model('Poll', pollSchema);