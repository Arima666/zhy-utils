# @fatyu/git-diff

## 能力

- 通过命令行快速选择需要 diff 的分支、tag、commit
- 支持输出简单的比较结果 csv
  - 包含修改文件路径、修改行数
  - 可以过滤不需要比较文件类型

## 快速开始

### 安装

```sh
# npm
npm i @fatyu/git-diff -D

# yarn
yarn add @fatyu/git-diff -D
```

### 使用

```sh
# 简单使用

  # npm
  npm git-diff

  # yarn
  yarn git-diff

# 更多例子（yarn 为例)

  # 帮助
  yarn git-diff -h
```

### 命令行参数

| 简写 | 参数                | 含义                                                           |
| :--- | :------------------ | :------------------------------------------------------------- |
| -v   | --version           | @fatyu/git-diff 的版本                                         |
| -f   | --file-type [type]  | 输出文件类型 (choices: "csv", "diff", "patch", default: "csv") |
| -s   | --source [source]   | 来源分支、tag、commit                                          |
| -t   | --target [target]   | 目标分支、tag、commit                                          |
| -e   | --exclude [exclude] | 需要忽略的文件类型，以`竖线`分割                               |
| -h   | --help              | 输出帮助内容                                                   |
