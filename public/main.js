let n = 1;
getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/3.html')
    request.onload = () => {
        //创建div标签
        const div = document.createElement('div')
        //填写div内容
        div.innerHTML = request.response
        //插到body里面
        document.body.appendChild(div)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()
}

getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/2.js')
    request.onload = () => {
        //创建script标签
        const script = document.createElement('script')
        //填写script内容
        script.innerHTML = request.response
        //插到body里面
        document.body.appendChild(script)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()
}

// getCSS.onclick = () => {
//     const request = new XMLHttpRequest()
//     request.open('GET', '/style.css')
//     request.onload = () => {
//         console.log('request.response:')
//         console.log(request.response)
//         //把js中的CSS样式添加到html中实现
//         //创建style标签
//         const style = document.createElement('style')
//         //填写style内容
//         style.innerHTML = request.response
//         //插到head里面
//         document.head.appendChild(style)
//     }
//     request.onerror = () => {
//         console.log('失败了')
//     }
//     request.send()
// }


getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/style.css')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {//只有当需求加载的状态码的等于4时才是加载完成
            // console.log(request.readyState)//依次打印2 3 4

            console.log('下载完成')//下载完成大不确定时成功下载完成还是失败下载完成
            console.log(request.status)//打印出状态码//202则下载成功页面//404则下载失败页面
            if (request.status >= 200 && request.status < 300) {//状态码大于等于200小于300为加载成功（以2开头则为成功），否则为失败//request.status请求状态码（浏览器bug：此处拼写应为响应状态码）
                //创建style标签
                const style = document.createElement('style')
                //填写style内容
                style.innerHTML = request.response
                //插到head里面
                document.head.appendChild(style)
            }
            else {
                alert('加载CSS 失败')
            }

        }

    }
    request.send()
}

getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/4.xml')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {//简写
            // console.log(request.response)现在为字符串
            // console.log(request.responseXML)//特殊api：responseXML可以把字符串自动转换成对象（dom对象！）
            const dom = request.responseXML//dom不光可以用于html还可以用于xml
            const test = dom.getElementsByTagName('warning')[0].textContent//getElementsByTagName默认为数组，必须加索引值
            console.log(test.trim())//.trim()去掉文本空格和换行
        }
    };
    request.send()
}

getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/5.json')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {//简写
            // console.log(request.response)//.response（响应）；request.response：请求相应
            // console.log(typeof request.response)
            const object = JSON.parse(request.response)//JSON.parse（解析）=>通过JSON的函数parse：把符合JSON的字转换成符合JSON的数据类型（不一定只是对象，bool也可以）！！
            //重要：AJAX目前最新状态：通过JSON代替XML来展示数据（数据请求）
            // console.log(object)
            // console.log(typeof object)
            myName.textContent = object.name//通过JSON更改HTML页面
            //用途广泛：进入网页时，右上角会显示”欢迎 XXX“ 就是通过这种AJAX方式制作的


        }
    };
    request.send()
}


getPage.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `/page${n + 1}`)//注意不能加后缀
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {//简写
            const array = JSON.parse(request.response)
            array.forEach(item => {
                const li = document.createElement('li')//创建li标签
                li.textContent = item.id//遍历每个元素并添加<li>标签
                xxx.appendChild(li)//把li插入到xxx（<ul>）中去
            });
            n += 1;
        }
    };
    request.send()
}