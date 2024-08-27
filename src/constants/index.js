// PC设备指定宽度
export const PC_DEVICE_WIDTH = 1280

// 图片数据类别
export const ALL_CATEGORY = {
    id:'all',
    name:'全部'
}

export const CATEGORY_DATA = [
    ALL_CATEGORY,
    {id:'web_app_icon',name:'UI/UX'},
    {id:'design',name:'平面'},
    {id:'illustration',name:'插图/漫画'},
    {id:'photography',name:'摄影'},
    {id:'games',name: '游戏' },
    {id:'anime',name: '动漫' },
    {id:'industrial_design',name:'工业设计'},
    {id:'industrial_design',name:'建筑设计'},
    {id:'industrial_design',name:'人文艺术'},
    {id:'industrial_design',name:'家居/家装'},
    {id:'star',name:'明星'},
]

// 主题模式 浅色 深色 默认
export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'
export const THEME_SYSTEM = 'light'
export const theme = [
    {
        type: THEME_LIGHT,
        icon: 'theme-light',
        name: '极简白'
    },
    {
        type: THEME_DARK,
        icon: 'theme-dark',
        name: '极夜黑'
    },
    {
        type: THEME_SYSTEM,
        icon: 'theme-system',
        name: '跟随系统'
    }
]