# sort-visualization
排序算法可视化展示，实现了元素比较展示，和交换动画。

[展示网址](https://xiaojiezhou2017.github.io/sort-visualization/)

目前实现了
* 简单选择排序
* 插入排序
* 希尔排序
* 快速排序
* 冒泡排序
* 二分法查找
* [堆排序展示网址](https://xiaojiezhou2017.github.io/binaryTree/)

## 算法学习笔记

* 稳定算法的好处？
  之前错误的以为，~~算法的稳定性是指算法在最坏和最优的情况下，时间复杂度和空间复杂度相差不大，或者在大多数情况下，时间复杂度变化不大~~。
  
  算法稳定性的定义是：`如果一个排序算法能够保留数组中重复元素的相对位置则可以被称为是稳定的。 说白了就是键值相同的元素，在排序过程中的顺序是不应该算法发   生变化的。` 
  
  例如大家最熟悉的通讯录假设有四条数据：
  ```
   { name: 'zhou', date: '2017-08-07' },
   { name: 'zhou', date: '2017-09-1' },
   { name: 'li', date: '2017-10-1' },
   { name: 'wu', date: '2017-11-1' }
  ```
  假设现在有这样一个需求： 通讯录按照姓名排序，并且姓名相同的，按照创建时间排序。
  
  那么此时就体现出了稳定性排序算法的优势：`不会改变重复元素之前的顺序`。
  
  此时可以先使用排序算法对上面的记录按照时间进行排序，这次排序可以是稳定的或者不稳定的。关键是第二次排序。
  
  排序后的记录为：
  
  ```
   { name: 'zhou', date: '2017-08-07' },
   { name: 'zhou', date: '2017-09-1' },
   { name: 'li', date: '2017-10-1' },
   { name: 'wu', date: '2017-11-1' }
  ```
  现在进行第二次排序，按照姓名首字母进行排序。注意此时稳定性排序算法和非稳定性排序算法就会表现出不一样的结果。
  
  稳定性排序算法的排序结果肯定是：
  ```
   { name: 'li', date: '2017-10-1' },
   { name: 'wu', date: '2017-11-1' }
   { name: 'zhou', date: '2017-08-07' },
   { name: 'zhou', date: '2017-09-1' },
  ```
  注意此时`两条姓名为zhou的记录，依然是按照时间进行排序的`

  不稳定的排序算法的会是：
  ```
   { name: 'li', date: '2017-10-1' },
   { name: 'wu', date: '2017-11-1' }
   { name: 'zhou', date: '2017-09-01' },
   { name: 'zhou', date: '2017-08-7' },
  ```
  注意此时`两条姓名为zhou的记录，不再是按照时间进行排序的，因为不稳定性排序会改变相同记录的位置`
