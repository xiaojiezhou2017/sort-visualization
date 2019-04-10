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
                this.operations.push([minIndex, j, 'compare'])
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

    // 快速排序
    _quickSort (a, start, end) {
        if (end <= start) {
            return;
        }
        const stand = a[start];
        this.operations.push([`快速排序:基准：${stand} 边界:${start}-${end} 边界值：${a[start]} - ${a[end]}`, undefined, 'info']);
        // 表示基准
        this.operations.push([start, end, 'moveTwo']);
        // this.operations.push([start, start, 'exchange']);
        let i = start;
        let j = end;
        while (i < j) {
            while (j > i) {
              this.operations.push([j, i, 'compare']);
              if (a[j] > stand) {
                  j--
              } else {
                  break;
              }
            }
            if (a[j] < stand) {
                this.operations.push([i, j, 'exchange']);
                this.exch(a, i, j);
            }
            while (j > i) {
                this.operations.push([i, j, 'compare']);
                if (a[i] < stand) {
                    i++
                } else {
                    break;
                }
            }
            if (a[i] > stand) {
                this.operations.push([i, j, 'exchange']);
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

    run (arr, type) {
        this.operations = [];
        this[type](arr);
        return this.operations;
    }
}
