module.exports.updateLike = (userId, likeNumber, likedUsers, like) => {
    if (like == true) {
        let user = likedUsers.indexOf(userId._id);
        if (user === -1) {
            likeNumber = ++likeNumber;
            likedUsers = [...likedUsers, userId];
        } else {
            likeNumber = --likeNumber;

            likedUsers = likedUsers.splice(user - 1, 1);
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
        if (userIndex === -1) {
            ratingAddUsers = [...ratingAddUsers, user];
        } else {
            ratingAddUsers = ratingAddUsers.splice(userIndex - 1, 1);
            ratingAddUsers = [...ratingAddUsers, user];
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

module.exports.updateChapter = (chapterId, chapters, body, file) => {
    let chapterIndex = chapters.map(i => i._id).indexOf(chapterId);
    const updateI = (i, j) => {
        return i ? i : j
    }
    const update = {
        _id:chapters[chapterIndex]._id,
        imageSrc: updateI(file.path, chapters[chapterIndex].imageSrc),
        body: updateI(body.body, chapters[chapterIndex].body),
        title: updateI(body.title, chapters[chapterIndex].title),
    };
    chapters[chapterIndex] = update;
    return chapters
};