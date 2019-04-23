const Sort = {
    exchangeNum: 0,
    diffNum: 0,
    stand: '', // 标识快速排序的基准元素
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
                // this.operations.push([minIndex, j, 'compare'])
                this.addOprations([minIndex, j, 'compare', ['最小值']]);
                if (a[minIndex] > a[j]) {
                    minIndex = j;
                }
            }
            // this.operations.push([i, minIndex, 'exchange'])
            this.addOprations([i, minIndex, 'exchange']);
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
                    this.addOprations([j-h, j, 'compare']);
                    if (a[j] > a[j-h]) {
                        break;
                    }
                    this.addOprations([j-h, j, 'exchange']);
                    this.exch(a, j, j-h);
                }
            }
            h = parseInt(h / 3)
        }
    },
    // 冒泡排序
    bubbleSort (a) {
        const len = a.length;
        for (let i = 0; i < len -1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                this.addOprations([j, j+1, 'compare']);
                if (a[j] > a[j+1]) {
                    this.addOprations([j, j+1, 'exchange']);
                    this.exch(a, j, j+1);
                }
            }
        }
    },

    // 简单插入排序
    insertSort (a) {
        const len = a.length;
        for (let i = 0; i < len; i++) {
            for (let j = i; j > 0; j--) {
                this.addOprations([j-1, j, 'compare']);
                this.stand = a[j];
                // 这里是为了添加比较操作，猜这么写，其实好的写法应该是  for (let j = i; j > 0 && a[j] < a[j-1]; j--) {}
                if (a[j] > a[j-1]) {
                    break;
                }
                this.addOprations([j-1, j, 'exchange']);
                this.exch(a, j, j-1)
            }
        }
    },

    // 快速排序
    _quickSort (a, start, end) {
        if (end <= start) {
            return;
        }
        const stand = a[start];
        this.stand = stand;
        // 表示基准
        this.addOprations([start, end, 'compare', ['左边界', '右边界']]);
        let i = start;
        let j = end+1;
        while (true) {
            while (true) {
                this.addOprations([start, i === end ? end : i+1, 'compare', ['', 'i指针']]);
                if (i === end || a[++i] > stand) {
                    this.addOprations([i, undefined, 'flag', ['i指针']]);
                    break;
                }
            }
            while (true) {
                this.addOprations([start,j === start ? start : j-1, 'compare', ['', 'j指针']]); 
                if (j === start || a[--j] < stand) {
                    this.addOprations([j, undefined, 'flag', ['j指针']]);
                    break;
                }
            }
            if (i >= j) {
                break;
            }
            this.addOprations([i,  j, 'exchange']); 
            this.addOprations([undefined, undefined, 'clearFlag']);
            this.exch(a, i, j)
        }
        this.addOprations([start,  j, 'exchange']); 
        this.exch(a, start, j);
        this.addOprations([j, undefined, 'clearFlag']);
        this._quickSort(a, start, j-1);
        this._quickSort(a, j+1, end);
    },

    // 二分法查找
    _binarySearch (arr, start, end, target, index) {
        this.addOprations([`查找的值:${target}, 当前中间值: `, undefined, 'info'], false);
        if (start >= end) {
            return; 
        }
        const mid = start +  (Math.floor((end - start) / 2));
        const desc = ['目标值'];
        desc.remain = true;
        this.addOprations([index, undefined, 'flag', desc], false);
        this.addOprations([mid, mid, 'exchange'], false);
        this.addOprations([mid, undefined, 'flag', ['中间值']], false);
        this.addOprations([undefined, undefined, 'clearFlag'], false);
        this.addOprations([`查找的值:${target}, 当前中间值: ${mid}`, undefined, 'info'], false);
        const midValue = arr[mid];
        if (midValue === target) {
            return mid;
        }
        if (target > midValue) {
            this.addOprations([mid+1, end, 'compare', ['左边界', '右边界']], false);
            return this._binarySearch(arr, mid+1, end, target, index);
        } else {
            this.addOprations([start, mid, 'compare', ['左边界', '右边界']], false);
            return this._binarySearch(arr, start, mid, target, index);
        }
    },

    binarySearch (arr) {
        const targetIndex = Math.floor(Math.random() * 15);
        this._binarySearch(arr,0, arr.length - 1, arr[targetIndex], targetIndex);
    },

    quickSort (arr) {
        this._quickSort(arr, 0, arr.length - 1);
    },

    addOprations (opt, isSort = true) {
        if (isSort) {
            this.operations.push([
                `比较次数:${this.diffNum} 交换次数:${this.exchangeNum} 基准元素：${this.stand}`, 
                undefined, 
                'info'
            ]);
        }
        const type = opt[2];
        if (type === 'exchange') {
            this.exchangeNum++;
        } else if (type === 'compare') {
            this.diffNum++;
        }
        this.operations.push(opt);
    },

    run (arr, type) {
        this.operations = [];
        this.diffNum = 0;
        this.exchangeNum = 0;
        this[type](arr);
        return this.operations;
    }
}
