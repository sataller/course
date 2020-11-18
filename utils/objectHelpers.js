module.exports.updateLike = (userId, likeNumber, likedUsers, like) => {
    if (like === true) {
        let user = likedUsers.indexOf(userId._id);
        if (user === -1) {
            likeNumber = ++likeNumber;
            likedUsers = [...likedUsers, userId];
        } else if (likedUsers.length === 1) {
            likeNumber = --likeNumber;
            likedUsers = [];
        } else {
            likeNumber = --likeNumber;
            likedUsers = likedUsers.splice(user, 1);
        }
        return ({
                likeNumber,
                likedUsers,
            }
        )
    } else {
        return ({
            likeNumber,
            likedUsers,
        })
    }
};

module.exports.updateRate = (userId, ratingNumber, ratingAddUsers, newRate) => {
    if (newRate) {
        let user = {user: userId, rating: newRate};
        let userIndex = ratingAddUsers.map(i => i.user).indexOf(userId._id);
        console.log(userIndex);
        if (userIndex === -1) {
            ratingAddUsers = [...ratingAddUsers, user];
            ratingAddUsers[userIndex].rating = newRate;
        } else {
            ratingAddUsers[userIndex].rating = newRate;
        }
        ratingNumber = ratingAddUsers.reduce((sum, item) => sum + item.rating, 0) / ratingAddUsers.length;
        return ({
                ratingNumber,
                ratingAddUsers,
            }
        )
    } else {
        return ({
            ratingNumber,
            ratingAddUsers,
        })
    }
};

module.exports.updateChapter = (chapterName, chapters, body, file) => {
    let chapterIndex = chapters.map(i => i.title).indexOf(chapterName);
    const updateI = (i, j) => {
        return i ? i : j
    };
    const update = {
        _id: chapters[chapterIndex]._id,
        imageSrc: file ? file.location : chapters[chapterIndex].imageSrc,
        body: updateI(body.body, chapters[chapterIndex].body),
        title: updateI(body.title, chapters[chapterIndex].title),
    };
    chapters[chapterIndex] = update;
    return chapters
};
module.exports.updateUserStatus = (prevUserStatus, newUserStatus) => {
    let newStatus = prevUserStatus;
   if (newUserStatus === true || newUserStatus === false ){
       newStatus = newUserStatus;
   }
    return newStatus
};