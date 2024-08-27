import service from ".";

// 获取搜索提示
export const getHint = (val) => {
    return service({
        method:'get',
        url:'/pexels/hint',
        params:{
            val
        }
    })
}

// 获取推荐图片主题
export const getTheme = () => {
    return service({
        method:'get',
        url:'/pexels/themes'
    })
}

// 获取图片数据
export const getPexelsList = (data) => {
    return service({
        method:'get',
        url:'/pexels/list',
        params:data
    })
}

// 获取指定的图片数据
export const getPhoto = (id) => {
    return service({
        method:'get',
        url:`/pexels/${id}`
    })
}