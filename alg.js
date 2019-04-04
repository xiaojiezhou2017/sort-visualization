const Sort = {
    exch(a, i, j)  {
        [a[j], a[i]] = [a[i], a[j]];
    },
    operations: [],
    isSorted (a) {
        return a.every((item, index) => {
            let last = a[index + 1];
            if (last === undefined) {
                last = Infinity;
            }
            return item < last
        })
    },
    show (a) {
        a.forEach(i => console.log(i));
    },
    // 选择排序
    choiceSort (a) {
        const len = a.length;
        for (let i = 0; i < len; i++) {
            let minIndex = i;
            for (let j = i+1; j < len; j++) {
                this.operations.push([minIndex, j])
                if (a[minIndex] > a[j]) {
                    minIndex = j;
                }
            }
            this.operations.push([i, minIndex, 'exchange'])
            this.exch(a,minIndex, i)
        }
    },
    // 希尔排序
    shellSort (a) {
        const len = a.length;
        let h = 1;
        while (h < len / 3) {
            h = parseInt(3 * h + 1);
        }
        while (h >= 1) {
            for (let i = h; i < len; i++) {
                for (let j = i; j >= h; j-=h) {
                    this.operations.push([j-h, j, 'compare'])
                    if (a[j] < a[j-h]) {
                        this.operations.push([j-h, j, 'exchange'])
                        this.exch(a, j, j-h);
                    }
                }
            }
            h = parseInt(h / 3)
            console.log('h', h)
        }
    },
    // 简单插入排序
    insertSort (a) {
        const len = a.length;
        for (let i = 0; i < len; i++) {
            for (let j = i; j > 0; j--) {
                this.operations.push([j-1, j, 'compare'])
                if (a[j] < a[j-1]) {
                    this.operations.push([j-1, j, 'exchange'])
                    this.exch(a, j, j-1)
                }
            }
        }
    },

    mergeSort (a) {
        const that = this;
        _sort(a, 0, a.length - 1)
        function _sort(a, low, high) {
            if (high <= low) {
                return
            }
            const mid = low + parseInt((high - low) / 2)
            _sort(a, low, mid)
            _sort(a, mid + 1, high)
            merge(a, low, mid, high)
        }

        function merge (a, low, mid, high) {
            const temp = [];
            let i = low, j = mid + 1;
            for (let k = low; k <= high; k++) {
                temp[k] = a[k];
            }
            for (let k = low; k <= high; k++) {
                // let i = low, j = mid + 1; 这段代码放在这里为什么有问题
                if (i > mid) {
                    a[k] = temp[j++]
                    that.operations.push([k, j, 'exchange'])
                } else if (j > high) {
                    a[k] = temp[i++]
                    that.operations.push([k, i, 'exchange'])
                } else if (temp[j] > temp[i]) {
                    a[k] = temp[i++]
                    that.operations.push([i, k, 'exchange'])
                } else {
                    a[k] = temp[j++]
                    that.operations.push([k, j, 'exchange'])
                }
            }
        }
    },

    run (arr, type) {
        this.operations = [];
        this[type](arr);
        return this.operations;
    }
}
