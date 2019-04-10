
const render = {
    heightLightColor: '#87CEEB',
    size: 30,
    speed: 50,
    index: 0,
    animationQueue: [],
    children: null,
    status: 'finished',
    isStop: false,
    render (data) {
        const wrapper = document.querySelector('.wrapper');
        const fragment  =  document.createDocumentFragment();
        data.forEach((i, index) => {
            const size = this.size + 'px';
            const div = document.createElement('div');
            div.setAttribute('class', 'child');
            div.setAttribute('id', i);
            div.style.left = index * 50 + 'px';
            div.innerHTML = i;
            div.style.height = size;
            div.style.width = size;
            div.style.lineHeight = size;
            fragment.appendChild(div);
        })
        const newWrapper = document.createElement('div');
        newWrapper.setAttribute('class', 'wrapper');
        newWrapper.appendChild(fragment);
        document.body.replaceChild(newWrapper, wrapper);
    },

    getElement(id) {
        if (!this.children) {
            this.children =  Array.from(document.querySelectorAll('.child'));
            this.children.forEach((i, index) => i.index = index);
        }
        return this.children.find(i => i.index === id);
    },

    getPosition (ele) {
        return parseInt(ele.style.left);
    },
    // 查找高亮
    heightLight (x, y) {
        return new Promise((resolve, reject) => {
            x.style.background = y.style.background = this.heightLightColor;
            setTimeout(() => {
                x.style.background = y.style.background = '#fff'
                resolve();
            }, this.speed * 30)
        })
    },
    exchange (x, y, type) {
        if (type === 'info') {
          return this.showInfo(x);
        }
        const { getPosition }  = this;
        const xEle = this.getElement(x);
        const yEle = this.getElement(y);
        // 在高亮而不是交换的时候，是不需要重新设置定义的索引的
        if (type === 'exchange') {
            xEle.index = y;
            yEle.index = x;
        }
        const yPos = getPosition(yEle)
        const xPos = getPosition(xEle)
        const R = (yPos - xPos) / 2;
        if (type === 'exchange') {
            if (x === y) {
                return this.moveLine(xEle);
            } else {
                return Promise.all([this.move(xEle, R, true, xPos), this.move(yEle, R, false, yPos)]);
            }
        } else if (type === 'compare')  {
            return this.heightLight(xEle, yEle);
        } else if (type === 'moveTwo') {
            return this.moveLineTwo(xEle, yEle);
        }
    },
    // 用来暂定动画，更新要展示的信息
    showInfo (x) {
        const infoDom = document.querySelector('#info');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                infoDom.innerHTML = x;
                resolve();
            }, 100)
        })
    },

    moveLine (target) {
        return new Promise((resolve, reject) => {
            let theta = 0;
            const step = Math.PI / 180 * 10;
            let top = 0;
            let isClear = false;
            const timer = setInterval(() => {
                theta += step;
                top = Math.sin(theta) * 20;
                if (theta / Math.PI > 2) {
                    isClear = true;
                }
                if ((top > 0.001 || top < -0.001) && isClear) {
                    clearInterval(timer);
                    resolve();
                }
                target.style.top = top + 'px';
            }, this.speed);
        })
    },
    // 同时移动两个元素，用来标识边界
    moveLineTwo (x, y) {
        return Promise.all([this.moveLine(x), this.moveLine(y)]);
    },

    move (target, R, dir, pos) {
        return new Promise((resolve, reject) => {
            let theta = 0;
            R = Math.abs(R)
            const step = Math.PI / 180 * 10;
            let x,y;
            const timer = setInterval(() => {
                theta += step;
                let xDis = R - R * Math.cos(theta);
                // pos-
                x = pos + (dir ? xDis: -xDis);
                // R+
                y = (dir ? -R : R) * Math.sin(theta);
                if (dir && y > 0) {
                    // 修正位置
                    y = 0;
                    clearInterval(timer);
                    resolve();
                }
                if (!dir && y < 0) {
                    // 修正位置
                    y = 0;
                    clearInterval(timer);
                    resolve();
                }
                target.style.top = y + 'px'
                target.style.left = x + 'px'
            }, this.speed)
        })
    },

    pushAction (list) {
        this.animationQueue = list;
    },

    async next () {
        if (this.status === 'doing') {
            return;
        }
        this.status = 'doing';
        const animationQueue = this.animationQueue.slice();
        const an = animationQueue[this.index];
        if (an) {
            await this.exchange(an[0], an[1], an[2]);
            this.status = 'finished'
        } else {
            alert('排序结束');
        }
        this.index++;
    },

    async renderAnimation () {
        this.isStop = false;
        if (this.status === 'doing') {
            return;
        }
        const animationQueue = this.animationQueue.slice(this.index);
        while (animationQueue.length) {
            if (this.isStop) break;
            const an = animationQueue.shift();
            await this.exchange(an[0], an[1], an[2]);
        }
    },

    reset () {
        this.status = 'finished';
        this.index = 0;
        this.isStop = true;
        this.children = null;
        this.showInfo('');
    }
};
