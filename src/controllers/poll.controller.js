const Poll = require('../models/poll.model');

exports.creatNewPoll = async (req, res) => {
    try {
        const { question, firstOption, firstOptionValues, secondOption, secondOptionValues } = req.body;

        const newPoll = new Poll({
            question,
            firstOption,
            firstOptionValues,
            secondOption,
            secondOptionValues
        });

        await newPoll.save();

        return res.status(201).json({
            message: 'Created poll successfully'
        })
    } catch (err) {
        return res.status(500).json({
            error: err.toString()
        })
    }
}

exports.getAllPolls = async (req, res) => {
    try {
        const polls = await Poll.find();

        return res.status(200).json({
            polls: polls
        })
    } catch (err) {
        return res.status(500).json({
            error: err.toString()
        });
    }
}

exports.increaseVotes = async (req, res) => {
    try {
        const { pollId, pollOption } = req.body;

        const updatePoll = await Poll.findById(pollId);

        const option = pollOption === updatePoll.firstOption ? 'firstOptionVotes' : 'secondOptionVotes';

        updatePoll[option] += 1;

        await updatePoll.save();

        return res.status(200).json({
            message: 'Voted successfully'
        });
    } catch (err) {
        return res.status(500).json({
            error: err.toString()
        })
    }
}

exports.removePoll = async (req, res) => {
    try {
        const deletedPoll = await Poll.findByIdAndRemove(req.body.pollId);

        if (!deletedPoll) {
            return res.status(400).json({
                message: 'Poll not exists'
            });
        }

        return res.status(200).json({
            message: 'Deleted poll successfully'
        });

    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
}