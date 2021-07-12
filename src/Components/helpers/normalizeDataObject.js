const normalizeData = (array) => {
    let arr = array.map((item) => {
        if (item.name === 'item') {
            return normalizeData(item.elements);
        } else {
        let value = item.elements.map((el) => {
            if (Array.isArray(el.elements)) {
                return normalizeData(el.elements);
            }
            return el.text;
            });
            if(value.filter(i => i.constructor.name === "Array").length === 0) return { [item.name]: value.join() }
            if(value.filter(i => i.constructor.name === "Array").length === 1) return { [item.name]: value.flat() } 
        };
        });
        return arr;
    }
    export const normalizeDataKeys = (elem) => {
    const newElem = normalizeData(elem).map((item) => {
        let obj = {};
        item.forEach(el => {
            if (Array.isArray(Object.values(el)[0])) {
                let itemsValue = Object.values(el).flat();
                let objEntr = {};
                itemsValue.forEach(e => objEntr = {...objEntr, ...e});
                el = objEntr;
                obj = {...obj, ...el};
            };
            obj = {...obj, ...el}
            });
        return obj;
    });
    return newElem;
    };