const allSelect = (key, string) => string === 'Всё' || string === 'всё' ? '' : key;
export default allSelect;