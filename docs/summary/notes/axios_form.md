---
title: 使用 axios 模拟表单提交
date: 2021-04-14
tags:
 - JavaScript
 - 日常问题
categories:
 - front
---

咱们平常在调用接口的时候，`content-type` 这块使用的类型是 `application/json`，当然这只是说一般情况下，我们会使用 `json` 的格式。而今天后端给到一个接口要求 `content-type` 是 `application/x-www-form-urlencoded`，那这是个什么类型呢？我们会在哪些场景用到呢？

首先，`application/x-www-form-urlencoded` 是 `form` 表单中 `encType` 的默认值，`form` 表单数据被编码为 `key/value` 格式发送到服务器（这是表单默认的提交数据的格式）。而我们经常会在表单提交里看到这样的 `content-type`。

> 在表单中进行文件上传时，会用到 `multipart/form-data` 这种格式。

然而实际情况是，当我们使用表单提交时，会强刷页面并跳转到 form 的 action 属性对应的 URL 上去。一开始，我抱着尝试一下的心理，不死心实验了一下：

```js
function simulationForm() {
  const formElement = document.createElement('form');
  formElement.action = 'url 地址';
  formElement.method = 'post';
  formElement.target = '_blank';
  formElement.style.display = 'none';
  
  formElement.appendChild(createInput('name', 'cecil'))
  formElement.appendChild(createInput('age', 28))
  formElement.appendChild(createInput('', 'submit', 'button'))

  document.body.appendChild(formElement);
  formElement.submit();
  document.body.removeChild(formElement);
}

function createInput(name, value, type) {
  const inputElement = document.createElement('input');
  type ? (inputElement.type = type) : (inputElement.type = 'hidden');
  inputElement.name = name;
  value && (inputElement.value = value);
  return inputElement;
}
simulationForm()
```

最后的结果，不言而喻，提交是提交了，但是并没有达到预期的效果。页面被刷新了，而且还跳转了。

上一个方法失败以后，我又开始尝试使用 axios 来模拟 form 表单提交，单纯的想，将 `content-type` 改为 `application/x-www-form-urlencoded` 就可以了，然而现实又给了我狠狠一巴掌：

```js
axios({
  url: 'url 地址',
  method: 'post',
  data: { name: 'cecil', age: 28 },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
})
```

当我去调用的时候，发现接口返回了 400，说明我参数传的有问题，打开 network 一看，formdata 那里显示确实怪异：

```json
// formData
"{ name: 'cecil', age: 28 }":
```

这...，我并没有处理数据，将其转为 formData 格式。继续踩坑——使用原生的 FormData API 进行数据转换：

```js
function stringify (data) {
  const formData = new FormData()
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key]) {
        if (data[key].constructor === Array) {
          if (data[key][0]) {
            if (data[key][0].constructor === Object) {
              formData.append(key, JSON.stringify(data[key]))
            } else {
              data[key].forEach((item, index) => {
                formData.append(key + `[${index}]`, item)
              })
            }
          } else {
            formData.append(key + '[]', '')
          }
        } else if (data[key].constructor === Object) {
          formData.append(key, JSON.stringify(data[key]))
        } else {
          formData.append(key, data[key])
        }
      } else {
        if (data[key] === 0) {
          formData.append(key, 0)
        } else {
          formData.append(key, '')
        }
      }
    }
  }
  return formData
}

axios({
  url: 'url 地址',
  method: 'post',
  data: { name: 'cecil', age: 28 },
  transformRequest: [
    function (data) {
      // 将请求数据转换成功 formdata 接收格式
      return stringify(data)
    }
  ],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
})
```

现在 formdata 的格式是 OK 了，但是 `Content-type` 又变成了 `multipart/form-data` 格式。在 axios 里设置的 `Content-Type` 并没有起作用。于是我又换了一个转换数据格式的方法，使用 axios 带有的 `qs` 模块进行转换，这样不但代码量少，而且最后的调用结果是成功的：

```js
import qs from 'qs';

axios({
  url: 'url 地址',
  method: 'post',
  data: qs.stringify({ name: 'cecil', age: 28 }),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
})
```

需要注意的是，虽然最后这个调用结果是成功的，但是 qs 格式化会过滤掉空数组数据，所以在使用时要注意。