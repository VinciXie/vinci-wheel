如仓库名，是一些轮子，目前有二叉树排序、快速排序和归并排序。

试了几次之后，感觉在 chrome 上效率最高的是快速排序。

随机生成 200000 个数进行排序，多次肉眼观测之后

- 二叉树排序在 250 ms 左右
- 快速排序在 160 ms 左右
- 归并排序在 4.4 s 左右 (也不知道是不是我写的算法有问题...)
