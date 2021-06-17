const allSelect = (key, string) => string === 'Все классы' || string === 'всё' || string === 'Все камеры' ? '' : key;
export default allSelect;