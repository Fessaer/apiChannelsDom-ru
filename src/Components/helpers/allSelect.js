const allSelect = (key, string) => string === 'Всё' || string === 'всё' || string === 'Все камеры' ? '' : key;
export default allSelect;