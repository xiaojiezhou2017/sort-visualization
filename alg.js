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
                this.addOprations([minIndex, j, 'compare']);
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
                    // this.operations.push([j-h, j, 'compare'])
                    this.addOprations([j-h, j, 'compare']);
                    if (a[j] < a[j-h]) {
                        // this.operations.push([j-h, j, 'exchange'])
                        this.addOprations([j-h, j, 'exchange']);
                        this.exch(a, j, j-h);
                    }
                }
            }
            h = parseInt(h / 3)
            console.log('h', h)
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
        // this.operations.push([start, end, 'moveTwo']);
        this.addOprations([start, end, 'moveTwo']);
        // this.operations.push([start, start, 'exchange']);
        let i = start;
        let j = end;
        while (i < j) {
            while (j > i) {
              // this.operations.push([j, i, 'compare']);
              this.addOprations([j, i, 'compare']);
              if (a[j] > stand) {
                  j--
              } else {
                  break;
              }
            }
            if (a[j] < stand) {
                // this.operations.push([i, j, 'exchange']);
                this.addOprations([i, j, 'exchange']);
                this.exch(a, i, j);
            }
            while (j > i) {
                // this.operations.push([i, j, 'compare']);
                this.addOprations([i, j, 'compare']);
                if (a[i] < stand) {
                    i++
                } else {
                    break;
                }
            }
            if (a[i] > stand) {
                // this.operations.push([i, j, 'exchange']);
                this.addOprations([i, j, 'exchange']);
                this.exch(a, i, j);
            }
        }
        // a[i] = stand;
        this._quickSort(a, start, j-1);
        this._quickSort(a, j+1, end);
    },

    quickSort (arr) {
        this._quickSort(arr, 0, arr.length - 1);
    },

    addOprations (opt) {
        this.operations.push([
            `比较次数:${this.diffNum} 交换次数:${this.exchangeNum} 基准元素：${this.stand}`, 
            undefined, 
            'info'
        ]);
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
