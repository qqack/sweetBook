
class Recommender {
    constructor(data, k, n) {
        this.data = data || {};
        // 得出最相近的k的近邻
        this.k = k || 3;
        // 推荐book的个数
        this.n = n || 12;
    }

    // 排序
    static sort (datas, key) {
        for (let i = 0; i < datas.length; i++) {
            for (let j = i + 1; j < datas.length; j++) {
                if (datas[i][key] < datas[j][key]) {
                    let temp = datas[i];
                    datas[i] = datas[j];
                    datas[j] = temp;
                }
            }
        }
        return datas;
    }

    // 计算皮尔逊相关系数
    static pearson(rating1, rating2) {
        let sum_xy = 0;
        let sum_x = 0;
        let sum_y = 0;
        let sum_x2 = 0;
        let sum_y2 = 0;
        let n = 0;
        for (let key in rating1) {
            if (rating1.hasOwnProperty(key)) {
                if (rating2 && rating2[key]) {
                    n++;
                    let x = rating1[key];
                    let y = rating2[key];
                    sum_xy += x * y;
                    sum_x += x;
                    sum_y += y;
                    sum_x2 += Math.pow(x, 2);
                    sum_y2 += Math.pow(y, 2);
                }
            }
        }
        if (n === 0) {
            return 0;
        }
        // 皮尔逊相关系数计算公式
        let denominator = Math.sqrt(sum_x2 - Math.pow(sum_x, 2) / n) * Math.sqrt(sum_y2 - Math.pow(sum_y, 2) / n);
        if (denominator === 0) {
            return 0;
        } else {
            return (sum_xy - (sum_x * sum_y) / n) / denominator;
        }
    }

    // 计算用户相似度
    computeNearestNeighbor(username) {
        let distances = [];
        for (let instance in this.data) {
            if (instance !== username && this.data.hasOwnProperty(instance)) {
                let distance = Recommender.pearson(this.data[username], this.data[instance]);
                distances.push({instance, distance});
            }
        }
        Recommender.sort(distances, 'distance');
        return distances;
    }

    // 推荐算法的主体函数
    recommend(user) {
        // 定义一个字典，用来存储推荐的书单和分数
        let recommendations = {};
        // 计算出user与所有其他用户的相似度，返回一个list
        let nearest = this.computeNearestNeighbor(user);

        let userRatings = this.data[user];

        let totalDistance = 0.0;
        // 得住最近的k个近邻的总距离
        for (let i = 0; i < this.k; i++) {
            totalDistance += nearest[i]['distance'];
        }
        if (totalDistance === 0.0) {
            totalDistance = 1.0;
        }

        // 将与user最相近的k个人中user没有看过的书推荐给user，并且这里又做了一个分数的计算排名
        for (let i = 0; i < this.k; i++) {
            // 第i个人的与user的相似度，转换到[0,1]之间
            let weight = nearest[i]['distance'] / totalDistance;

            // 第i个人的name
            let name = nearest[i]['instance'];

            // 第i个用户看过的书和相应的打分
            let neighborRatings = this.data[name];

            for (let artist in neighborRatings) {
                if (neighborRatings.hasOwnProperty(artist) && userRatings && !userRatings[artist]) {
                    if (!recommendations[artist]) {
                        recommendations[artist] = (neighborRatings[artist] * weight);
                    } else {
                        recommendations[artist] = (recommendations[artist]+ neighborRatings[artist] * weight);
                    }
                }
            }
        }

        // 将 recommendations 转化为数组并排序
        let array = [];
        for (let user in recommendations) {
            array.push([user, recommendations[user]]);
        }
        Recommender.sort(array, 1);

        // 取n条最佳结果
        let result = [];
        for (let i in array) {
            if (i >= this.n) {
                break;
            }
            result.push(array[i][0]);
        }
        return result;
    }
}

module.exports = Recommender;
