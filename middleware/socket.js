const History = require('../models/Histories');

module.exports.socket = (io) => {
    io.on('connection', (socket) => {
        socket.on('COMMENT:ADD', async (data) => {

            const history = await History.findById(data.historyId);
            let update;
            if (history.comments) {
                update = {
                    comments: [...history.comments,
                        {
                            body: data.body,
                            userId: data.userId,
                            userName: data.userName,
                        }
                    ]
                }
            } else {
                update = {
                    comments: [{
                        body: data.body,
                        userId: data.userId,
                        userName: data.userName,
                    }]
                }
            }
            const updatedHistory = await History.findOneAndUpdate(
                {_id: data.historyId},
                {$set: update},
                {
                    new: true,
                    useFindAndModify: false
                }
            );
            socket.broadcast.emit("NEW COMMENT", {updatedHistory, resultCode: 0});
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};