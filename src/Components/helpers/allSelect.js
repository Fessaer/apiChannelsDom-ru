const allSelect = (key, string) => string === 'Все объекты' || string === 'всё' || string === 'Все камеры' ? '0' : key;
export default allSelect;