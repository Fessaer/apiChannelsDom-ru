const allSelect = (key, string) => string === 'Все объекты' || string === 'всё' || string === 'Все камеры' ? '' : key;
export default allSelect;