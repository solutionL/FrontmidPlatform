import service from ".";

export const getCategory = () => {
    return service({
        method:'get',
        url:'/category'
    })
}